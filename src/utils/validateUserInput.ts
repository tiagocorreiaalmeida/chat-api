import { UserInputError } from 'apollo-server-express';
import joi from '@hapi/joi';

export const validateUserInput = (
  validation: joi.ObjectSchema<any>,
  data: Record<string, any>,
): void => {
  const { error } = validation.validate(data);
  const errorMessage = error?.details?.[0]?.context?.label;

  if (errorMessage) {
    throw new UserInputError(errorMessage);
  }
};
