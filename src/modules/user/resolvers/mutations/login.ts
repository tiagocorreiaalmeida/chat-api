import { Resolver, Mutation, InputType, Field, Arg, ObjectType } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-express';

import { User } from '#Modules/user/models';
import { generateAuthTokens } from '#Modules/user/utils';
import { userErrorMessages } from '#Modules/user/validations';
import { Tokens } from '#Modules/user/types';

@InputType()
class LoginUserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class LoginUserPayload {
  @Field()
  user: User;

  @Field()
  tokens: Tokens;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginUserPayload)
  async login(@Arg('data') loginInput: LoginUserInput): Promise<LoginUserPayload> {
    const { email, password } = loginInput;

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
}
