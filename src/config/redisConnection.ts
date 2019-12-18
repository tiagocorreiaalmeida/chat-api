import Redis from 'ioredis';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
const port = REDIS_PORT ? +REDIS_PORT : 6379;

const redis = new Redis({
  host: REDIS_HOST,
  port,
  password: REDIS_PASSWORD,
});

redis.on('error', (e) => {
  console.log(`Redis error: ${e}`);
});

export default redis;
