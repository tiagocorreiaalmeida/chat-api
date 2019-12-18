import 'reflect-metadata';
import { createServer, Server } from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import createSchema from './config/createSchema';
import createDbConnection from './config/createDbConnection';
import { GraphQLFormattedError } from 'graphql';

const isProd = process.env.NODE_ENV === 'PROD';
const { PORT = 4000 } = process.env;

const apolloConfigurations = {
  playground: !isProd,
  introspection: !isProd,
  debug: isProd,
};

export const startServer = (): Promise<Server> =>
  new Promise<Server>(async (resolve) => {
    await createDbConnection();

    const schema = await createSchema();
    const app = express();

    const apolloServer = new ApolloServer({
      schema,
      ...apolloConfigurations,
      formatError: (err): GraphQLFormattedError => {
        let { message } = err;
        const errorExtensionCode = err?.extensions?.code;
        const extensions = errorExtensionCode ? { code: errorExtensionCode } : {};

        if (!isProd) {
          console.log(message);
        }

        const isInternalError = err?.extensions?.code === 'INTERNAL_SERVER_ERROR';
        if (isInternalError) {
          message = 'Internal server error';
        }
        return {
          ...err,
          message,
          extensions,
        };
      },
    });

    apolloServer.applyMiddleware({ app });

    const httpServer = createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);

    httpServer.listen(PORT, () => {
      resolve(httpServer);

      if (!isProd) {
        console.log(`Playground: http://localhost:${PORT}${apolloServer.graphqlPath}`);
      }
      console.log(`Subscriptions: ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
    });
  });
