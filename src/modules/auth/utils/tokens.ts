import jwt from 'jsonwebtoken';

const {
  JWT_SECRET: jwtSecret = 'secret',
  JWT_REFRESH_TOKEN_EXPIRATION: jwtRefreshTokenExpiration = '7 days',
  JWT_EXPIRATION: jwtExpiration = '3 hours',
} = process.env;

export interface JwtPayload {
  userId: string;
}

export interface AuthTokens {
  token: string;
  refreshToken: string;
}

export const generateToken = (
  payload: Record<string, any> | string | Buffer,
  expiresIn: string | number = jwtExpiration,
): string => {
  return jwt.sign(payload, jwtSecret, { expiresIn });
};

export const generateAuthTokens = (payload: JwtPayload): AuthTokens => {
  const token = generateToken(payload);
  const refreshToken = generateToken(payload, jwtRefreshTokenExpiration);

  return { token, refreshToken };
};
