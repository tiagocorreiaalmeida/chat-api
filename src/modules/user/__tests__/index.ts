import { TestServer } from '#Base/test-utils';

const server = TestServer.getInstance();

describe('#User', function() {
  this.timeout(60000);

  before(async () => {
    await server.start();
  });

  describe('#Mutation', () => {
    require('./register');
    require('./confirmUser');
    require('./login');
  });
});
