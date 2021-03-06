import { UserInputError } from 'apollo-server-express';
import { Injectable } from '@graphql-modules/di';
import { AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';

import { createConfirmationUrl, confirmUserTemplate } from '../utils';
import { userRegisterValidation, userErrorMessages, generateAuthTokens } from '../utils';
import { RedisPrefixes } from '../types';
import redis from '#Base/config/redisConnection';
import { User } from '#Modules/user/models';
import { encryptContent, sendEmail } from '#Utils/index';
import { validateUserInput } from '#Base/utils';
import {
  LoginInput,
  RegisterInput,
  ConfirmInput,
  LoginPayload,
  User as UserObj,
} from '#Base/generated/typed-schema';

@Injectable()
export class AuthProvider {
  async register(data: RegisterInput): Promise<UserObj> {
    validateUserInput(userRegisterValidation, data);

    const { email, password, username } = data;

    const userExists = await User.findOne({ where: [{ email }, { username }] });
    if (userExists) {
      const duplicatedUserError =
        userExists.email === email
          ? userErrorMessages.duplicatedEmail
          : userErrorMessages.duplicatedUsername;

      throw new UserInputError(duplicatedUserError);
    }

    const user = await User.create({
      email,
      username,
      password: encryptContent(password),
    }).save();

    const confirmationUrl = await createConfirmationUrl(user.id);
    await sendEmail(user.email, 'Account confirmation', confirmUserTemplate(confirmationUrl));

    return user;
  }

  async login(data: LoginInput): Promise<LoginPayload> {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (user && !user.isActive) {
      throw new AuthenticationError(userErrorMessages.accountInactive);
    } else if (!user || (user && !bcrypt.compareSync(password, user.password))) {
      throw new AuthenticationError(userErrorMessages.authenticationFailed);
    }

    const tokens = generateAuthTokens({ userId: user.id });

    return {
      user,
      tokens,
    };
  }

  async confirm(data: ConfirmInput): Promise<boolean> {
    const { token } = data;
    const redisKey = RedisPrefixes.CONFIRM_USER + token;
    const userId = await redis.get(redisKey);

    if (!userId) {
      return false;
    }

    await User.update({ id: userId }, { isActive: true });
    await redis.del(redisKey);

    return true;
  }
}
