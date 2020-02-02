import { GraphQLModule } from '@graphql-modules/core';

import { AuthModule } from '#Modules/auth';
import { UserModule } from '#Modules/user';

export const AppModule = new GraphQLModule({
  imports: [AuthModule, UserModule],
});
