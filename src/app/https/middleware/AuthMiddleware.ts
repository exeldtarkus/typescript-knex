import {Response, NextFunction} from 'express';
import {BaseResource} from '../resources/BaseResource';
import {logger} from '../../utils/LoggerUtils';
import {verifyAccessToken} from '../../configs/JwtConfig';
import {IMainRequest} from '../requests/MainRequest';

export function authMiddleware(
  req: IMainRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return BaseResource.exec(res, {
      data: null,
      isSuccess: false,
      message: 'Unauthorized: No token provided',
      status: 401,
    });
  }

  const token = authHeader.split(' ')[1];

  const verify = verifyAccessToken(token);

  if (!verify.valid) {
    logger.error(`Unauthorized: ${verify.message}`);
    return BaseResource.exec(res, {
      message: `Unauthorized: ${verify.message}`,
      isSuccess: false,
      requestId: req.requestId,
      status: 401,
    });
  }

  req.token = token;
  req.userId = Number(verify.payload?.sub || '0');

  return next();
}
