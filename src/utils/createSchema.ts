import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import { MeResolver } from '../modules/user/resolvers/teste';

const createSchema = async (): Promise<GraphQLSchema> => {
  const schema = await buildSchema({
    resolvers: [MeResolver],
  });
  return schema;
};

export default createSchema;
