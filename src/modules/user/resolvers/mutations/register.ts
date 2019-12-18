import { Resolver, Mutation, InputType, Field, Arg } from 'type-graphql';

import { User } from '#Modules/user/models';
import { encryptContent, sendEmail } from '#Utils/index';
import { createConfirmationUrl, confirmUserTemplate } from '#Modules/user/utils';
import { userRegisterValidation, userErrorMessages } from '#Modules/user/validations';
import { validateUserInput } from '#Base/utils';
import { UserInputError } from 'apollo-server-express';

@InputType()
class RegisterUserInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg('data') registerData: RegisterUserInput): Promise<User> {
    validateUserInput(userRegisterValidation, registerData);

    const { email, password, username } = registerData;

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
}
