import { GraphQLModule } from '@graphql-modules/core';
import { loadSchemaFiles, loadResolversFiles } from '@graphql-toolkit/file-loading';
import path from 'path';

import { UserModule } from '#Modules/user';
/* import { ChannelProvider } from './providers/channel'; */

const typeDefs = loadSchemaFiles(path.join(__dirname, '/schema/*.graphql'));
const resolvers = loadResolversFiles(path.join(__dirname, '/resolvers/*.ts'));

export const ChatModule = new GraphQLModule({
  typeDefs,
  resolvers,
  imports: [UserModule],
  /*   providers: [ChannelProvider], */
});
