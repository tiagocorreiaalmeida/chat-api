import path from 'path';
import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

const createSchema = async (): Promise<GraphQLSchema> => {
  try {
    const resolversPath = path.resolve(process.cwd(), 'src/modules/**/resolvers/**/*{.ts,.js}');
    return await buildSchema({
      resolvers: [resolversPath],
      validate: false,
    });
  } catch (e) {
    throw new Error(`Unable to create Graphlql Schema, e: ${e.message}`);
  }
};

export default createSchema;
