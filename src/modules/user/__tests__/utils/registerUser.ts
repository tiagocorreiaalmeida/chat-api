import { RegisterUserInput, User } from '#Base/generated/sdk';
import { SdkClient } from '#Base/test-utils';

export const registerUser = async (
  sdkClient: SdkClient,
  data: RegisterUserInput,
): Promise<User> => {
  const registeredUser = await sdkClient.register({
    data,
  });

  return registeredUser.register;
};
