import redis from '#Base/config/redisConnection';
import { RedisPrefixes } from '#Modules/auth/types';

export const getConfirmationTokenAndKey = async (
  userId: string,
): Promise<{ token: string; tokenKey: string }> => {
  const confirmationKeys = await redis.keys(`${RedisPrefixes.CONFIRM_USER}*`);
  const confirmationKeysValues = await redis.mget(...confirmationKeys);
  const keyIndex = confirmationKeysValues.indexOf(userId);
  const tokenKey = confirmationKeys[keyIndex];

  return {
    token: tokenKey.replace(RedisPrefixes.CONFIRM_USER, ''),
    tokenKey,
  };
};
