import jwt from 'jsonwebtoken';
import env from './EnvConfig';

const APP_ACCESS_TOKEN_SECRET = env.APP_ACCESS_TOKEN_SECRET;
const APP_REFRESH_TOKEN_SECRET = env.APP_REFRESH_TOKEN_SECRET;

export interface IJwtGenerateToken {
  sub: string;
  username: string;
}

function getJwtErrorType(error: unknown): string {
  if (error instanceof jwt.TokenExpiredError) return 'TokenExpiredError';
  if (error instanceof jwt.JsonWebTokenError) return 'JsonWebTokenError';
  if (error instanceof jwt.NotBeforeError) return 'NotBeforeError';
  return 'UnknownError';
}

const generateAccessToken = (payload: IJwtGenerateToken) => {
  return jwt.sign(payload, APP_ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
};

const generateRefreshToken = (payload: IJwtGenerateToken) => {
  return jwt.sign(payload, APP_REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
};

const verifyAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, APP_ACCESS_TOKEN_SECRET);
    return {valid: true, payload: decoded};
  } catch (error) {
    return {
      valid: false,
      errorType: getJwtErrorType(error),
      message: `failed to verify access token - ${(error as Error).message}`,
    };
  }
};

const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, APP_REFRESH_TOKEN_SECRET);
    return {valid: true, payload: decoded};
  } catch (error) {
    return {
      valid: false,
      errorType: getJwtErrorType(error),
      message: `failed to verify refresh token - ${(error as Error).message}`,
    };
  }
};

const decodeToken = (
  token: string,
): {
  valid: boolean;
  payload: IJwtGenerateToken;
  message: string;
} => {
  try {
    const decoded: any = jwt.decode(token);
    return {
      valid: true,
      payload: {
        sub: decoded.sub,
        username: decoded.username,
      },
      message: 'decode token success!',
    };
  } catch (error) {
    return {
      valid: false,
      payload: {
        sub: '',
        username: '',
      },
      message: `failed to decode token - ${(error as Error).message}`,
    };
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
};
