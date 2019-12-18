import { v4 } from 'uuid';

import redis from '#Base/config/redisConnection';
import { RedisPrefixes } from '../types';

//update to environment variable
const expiration = 60 * 60 * 24;

export const createConfirmationUrl = async (userId: string): Promise<string> => {
  const token = v4();

  await redis.set(RedisPrefixes.CONFIRM_USER + token, userId, 'ex', expiration);

  return `http://localhost:3000/user/confirm/${token}`;
};

export const createForgotPasswordUrl = async () => {};
