import joi from '@hapi/joi';

import { userErrorMessages } from './error-messages';
import { mergeJoiSchemas } from '#Base/utils';

const setPasswordValidation = joi.object().keys({
  password: joi
    .string()
    .trim()
    .min(6)
    .max(255)
    .required()
    .label(userErrorMessages.invalidPassword),
});

const setEmailValidation = joi.object().keys({
  email: joi
    .string()
    .trim()
    .email()
    .required()
    .label(userErrorMessages.invalidEmail),
});

const setUsername = joi.object().keys({
  username: joi
    .string()
    .trim()
    .min(4)
    .max(50)
    .required()
    .label(userErrorMessages.invalidUsername),
});

const userRegisterValidation = mergeJoiSchemas([
  setEmailValidation,
  setUsername,
  setPasswordValidation,
]);

export { setPasswordValidation, setEmailValidation, setUsername, userRegisterValidation };
