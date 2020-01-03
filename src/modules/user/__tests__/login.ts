import { expect } from 'chai';
import faker from 'faker';

import { SdkClient, getErrorMessage, TestServer } from '#Base/test-utils';
import { LoginMutation, User } from '#Base/generated/sdk';
import { userErrorMessages } from '#Modules/user/validations';
import { registerUser, confirmUser } from './utils';

const server = TestServer.getInstance();

describe('#Login', function() {
  this.timeout(15000);

  let sdkClient: SdkClient;

  const activeUser = {
    username: faker.internet.userName('john'),
    email: faker.internet.email(),
    password: faker.internet.password(6),
  };

  const inactiveUser = {
    username: faker.internet.userName('john'),
    email: faker.internet.email(),
    password: faker.internet.password(6),
  };

  before(async () => {
    sdkClient = await server.getSdkClient();

    const registeredUser = await registerUser(sdkClient, activeUser);
    await confirmUser(sdkClient, registeredUser.id);

    await registerUser(sdkClient, inactiveUser);
  });

  it('should refuse an invalid user', async () => {
    let error, response!: LoginMutation;

    try {
      response = await sdkClient.login({
        data: {
          email: 'fakeruser@gmail.com',
          password: '1111',
        },
      });
    } catch (e) {
      error = e;
    }

    expect(response).to.be.undefined;
    expect(getErrorMessage(error)).to.equal(userErrorMessages.authenticationFailed);
  });

  it('should refuse a not active user', async () => {
    let error, response!: LoginMutation;

    try {
      response = await sdkClient.login({
        data: {
          email: inactiveUser.email,
          password: inactiveUser.password,
        },
      });
    } catch (e) {
      error = e;
    }

    expect(response).to.be.undefined;
    expect(getErrorMessage(error)).to.equal(userErrorMessages.accountInactive);
  });

  it('should refuse an user with invalid credentials', async () => {
    let error, response!: LoginMutation;

    try {
      response = await sdkClient.login({
        data: {
          email: activeUser.email,
          password: '',
        },
      });
    } catch (e) {
      error = e;
    }

    expect(response).to.be.undefined;
    expect(getErrorMessage(error)).to.equal(userErrorMessages.authenticationFailed);
  });

  it('should login the user', async () => {
    let error, response!: LoginMutation;

    try {
      response = await sdkClient.login({
        data: {
          email: activeUser.email,
          password: activeUser.password,
        },
      });
    } catch (e) {
      error = e;
    }

    expect(error).to.be.undefined;
    expect(response).to.be.a('object');

    const { user, tokens } = response.login;
    expect(user).to.be.a('object');
    expect(user.email).to.equal(activeUser.email);

    expect(tokens).to.be.a('object');
    expect(tokens.token).to.be.a('string');
    expect(tokens.refreshToken).to.be.a('string');
  });
});
