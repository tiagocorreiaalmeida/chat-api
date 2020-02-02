import { GraphQLModule } from '@graphql-modules/core';
import { loadSchemaFiles, loadResolversFiles } from '@graphql-toolkit/file-loading';
import path from 'path';

const typeDefs = loadSchemaFiles(path.join(__dirname, '/schema/*.graphql'));
/* const resolvers = loadResolversFiles(path.join(__dirname, '/resolvers/*.ts')); */

export const UserModule = new GraphQLModule({
  typeDefs,
  /*   resolvers, */
});
