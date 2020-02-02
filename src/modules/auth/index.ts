import { GraphQLModule } from '@graphql-modules/core';
import { loadSchemaFiles, loadResolversFiles } from '@graphql-toolkit/file-loading';
import path from 'path';

import { AuthProvider } from './providers/auth';
import { UserModule } from '#Modules/user';

const typeDefs = loadSchemaFiles(path.join(__dirname, '/schema/*.graphql'));
const resolvers = loadResolversFiles(path.join(__dirname, '/resolvers/*.ts'));

export const AuthModule = new GraphQLModule({
  typeDefs,
  resolvers,
  providers: [AuthProvider],
  imports: [UserModule],
});
