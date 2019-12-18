import 'reflect-metadata';
import * as http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import createSchema from './utils/createSchema';
import createDatabaseConnection from './utils/createDatabaseConnection';

const isDev = process.env.NODE_ENV === 'DEV';
const { PORT = 4000 } = process.env;

console.log('TEST PORT RELOAD ', PORT);

const apolloConfigurations = {
  playground: isDev,
  introspection: isDev,
  debug: isDev,
};

const mainInit = async (): Promise<void> => {
  await createDatabaseConnection();

  const schema = await createSchema();
  const app = express();
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    schema,
    ...apolloConfigurations,
  });
  apolloServer.applyMiddleware({ app });

  httpServer.listen(PORT, () => {
    if (isDev) {
      console.log(`Playground: http://localhost:${PORT}${apolloServer.graphqlPath}`);
    }
    console.log(`Subscriptions: ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
  });
};

mainInit();
