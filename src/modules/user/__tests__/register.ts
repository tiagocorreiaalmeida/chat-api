import { expect } from 'chai';
import faker from 'faker';

import { SdkClient, getErrorMessage, TestServer } from '#Base/test-utils';
import { RegisterMutation } from '#Base/generated/sdk';
import { userErrorMessages } from '#Modules/user/validations';

const server = TestServer.getInstance();

describe('#User', function() {
  this.timeout(30000);
  let sdkClient: SdkClient;

  before(async () => {
    await server.start();
    sdkClient = await server.getSdkClient();
  });

  describe('#Mutation__Register', () => {
    const userData = {
      username: faker.internet.userName('john'),
      email: faker.internet.email(),
      password: faker.internet.password(6),
    };

    it('should refuse an invalid email', async () => {
      let error, response;
      try {
        response = await sdkClient.register({
          data: {
            ...userData,
            email: 'fakeemail',
          },
        });
      } catch (e) {
        error = e;
      }

      expect(response).to.be.undefined;
      expect(getErrorMessage(error)).to.equal(userErrorMessages.invalidEmail);
    });

    it('should refuse an invalid password', async () => {
      let error, response;
      try {
        response = await sdkClient.register({
          data: {
            ...userData,
            password: '1',
          },
        });
      } catch (e) {
        error = e;
      }
      expect(response).to.be.undefined;
      expect(getErrorMessage(error)).to.equal(userErrorMessages.invalidPassword);
    });

    it('should refuse an invalid username', async () => {
      let error, response;

      try {
        response = await sdkClient.register({
          data: {
            ...userData,
            username: '1',
          },
        });
      } catch (e) {
        error = e;
      }
      expect(response).to.be.undefined;
      expect(getErrorMessage(error)).to.equal(userErrorMessages.invalidUsername);
    });

    it('should register a new user', async () => {
      let error, response!: RegisterMutation;

      try {
        response = await sdkClient.register({
          data: {
            ...userData,
          },
        });
      } catch (e) {
        error = e;
      }

      expect(error).to.be.undefined;
      expect(response.register).to.be.a('object');

      const { email, username, isActive } = response.register;
      expect(email).to.equal(userData.email);
      expect(username).to.equal(userData.username);
      expect(isActive).to.be.false;
    });

    it('should refuse a duplicated username', async () => {
      let error, response!: RegisterMutation;

      try {
        response = await sdkClient.register({
          data: {
            ...userData,
            email: 'aaaa@gmail.com',
          },
        });
      } catch (e) {
        error = e;
      }

      expect(response).to.be.undefined;
      expect(getErrorMessage(error)).to.equal(userErrorMessages.duplicatedUsername);
    });

    it('should refuse a duplicated email', async () => {
      let error, response!: RegisterMutation;

      try {
        response = await sdkClient.register({
          data: {
            ...userData,
            username: '12345',
          },
        });
      } catch (e) {
        error = e;
      }

      expect(response).to.be.undefined;
      expect(getErrorMessage(error)).to.equal(userErrorMessages.duplicatedEmail);
    });
  });
});
