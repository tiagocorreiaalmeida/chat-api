import { expect } from 'chai';
import faker from 'faker';

import { SdkClient, TestServer } from '#Base/test-utils';
import { ConfirmUserMutation } from '#Base/generated/sdk';
import { registerUser, getConfirmationTokenAndKey } from './utils';
import { User } from '../models';
import redis from '#Base/config/redisConnection';

const server = TestServer.getInstance();

describe('#ConfirmUser', function() {
  this.timeout(15000);

  let sdkClient: SdkClient;
  let registeredUserId: string;
  let confirmUserTokenRedisKey: string;
  let confirmUserToken: string;

  before(async () => {
    sdkClient = await server.getSdkClient();

    const userData = {
      username: faker.internet.userName('john'),
      email: faker.internet.email(),
      password: faker.internet.password(6),
    };

    const registeredUser = await registerUser(sdkClient, userData);
    registeredUserId = registeredUser.id;

    const { token, tokenKey } = await getConfirmationTokenAndKey(registeredUserId);
    confirmUserTokenRedisKey = tokenKey;
    confirmUserToken = token;
  });

  it('should refuse an invalid token', async () => {
    let error, response!: ConfirmUserMutation;

    try {
      response = await sdkClient.confirmUser({
        token: '12345',
      });
    } catch (e) {
      error = e;
    }

    expect(error).to.be.undefined;
    expect(response.confirmUser).to.be.false;
  });

  it('should confirm the user', async () => {
    let error, response!: ConfirmUserMutation;

    try {
      response = await sdkClient.confirmUser({
        token: confirmUserToken,
      });
    } catch (e) {
      error = e;
    }

    expect(error).to.be.undefined;
    expect(response.confirmUser).to.be.true;

    //ensure user has active value on the database
    const user = await User.findOne({ id: registeredUserId });
    expect(user?.isActive).to.be.true;

    //ensure key was deleted from redis
    const redisKey = await redis.get(confirmUserTokenRedisKey);
    expect(!!redisKey).to.be.false;
  });
});
