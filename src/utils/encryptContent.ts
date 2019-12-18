import bcrypt from 'bcryptjs';

const { JWT_SECRET } = process.env;

export const encryptContent = (content: string, withSecret?: boolean): string => {
  const salt = bcrypt.genSaltSync(10);
  const contentToEncrypt = withSecret ? content + JWT_SECRET : content;
  return bcrypt.hashSync(contentToEncrypt, salt);
};
