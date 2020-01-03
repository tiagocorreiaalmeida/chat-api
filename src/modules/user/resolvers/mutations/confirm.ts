import { Resolver, Mutation, Arg } from 'type-graphql';

import redis from '#Base/config/redisConnection';
import { RedisPrefixes } from '#Modules/user/types';
import { User } from '#Modules/user/models';

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string): Promise<boolean> {
    const redisKey = RedisPrefixes.CONFIRM_USER + token;
    const userId = await redis.get(redisKey);

    if (!userId) {
      return false;
    }

    await User.update({ id: userId }, { isActive: true });
    await redis.del(redisKey);

    return true;
  }
}
