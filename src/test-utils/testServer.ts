import { GraphQLClient } from 'graphql-request';

import { getSdk } from '#Base/generated/sdk';
import { startServer } from '#Base/server';

const port = process.env.PORT || 4000;
const serverUrl = `http://localhost:${port}/graphql`;

export type SdkClient = ReturnType<typeof getSdk>;
export class TestServer {
  private static instance: TestServer;
  private serverStarted: boolean;
  private sdkClient: SdkClient;

  private constructor() {}

  static getInstance(): TestServer {
    if (!this.instance) {
      this.instance = new TestServer();
    }

    return this.instance;
  }

  async getSdkClient(): Promise<SdkClient> {
    if (!this.sdkClient) {
      const client = new GraphQLClient(serverUrl);
      this.sdkClient = getSdk(client);
    }

    return this.sdkClient;
  }

  async start(): Promise<void> {
    if (!this.serverStarted) {
      await startServer();
      this.serverStarted = true;
    }
  }
}
