import { SdkClient } from '#Base/test-utils';
import { getConfirmationTokenAndKey } from './getTokens';

export const confirmUser = async (sdkClient: SdkClient, userId: string): Promise<void> => {
  const { token } = await getConfirmationTokenAndKey(userId);

  const userConfirmed = await sdkClient.confirm({
    data: { token },
  });

  if (!userConfirmed) {
    throw new Error('User confirmation failed');
  }
};
