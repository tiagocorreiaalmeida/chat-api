import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import { MeResolver } from '../modules/user/resolvers/teste';

const createSchema = async (): Promise<GraphQLSchema> => {
  try {
    const schema = await buildSchema({
      resolvers: [MeResolver],
    });
    return schema;
  } catch (e) {
    console.log(`Unable to create Graphlql Schema, e: ${e.message}`);
  }
};

export default createSchema;
