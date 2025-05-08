import {Response, NextFunction} from 'express';
import * as dotenv from 'dotenv';
import {BaseResource} from '../resources/BaseResource';
import {ELogStage, logger} from '../../utils/LoggerUtils';
import {IMainRequest} from '../requests/MainRequest';
import {HttpResponseStatusDesc} from '../../enums/HttpResponseEnum';
import {IAuthLoginRequestBody} from '../requests/IAuthLoginRequest';

dotenv.config();

const validatorAuthLogin = (
  req: IMainRequest<IAuthLoginRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  const requestBody = req.body;

  logger.info('[validatorAuthLogin]', ELogStage.start);
  logger.info('[validatorAuthLogin]', '[requestBody]', requestBody);

  if (!requestBody) {
    logger.error(`${HttpResponseStatusDesc.BadRequest}: body not found!`);
    logger.info('[validatorAuthLogin]', ELogStage.end);

    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.BadRequest}: body not found!`,
      isSuccess: false,
      requestId: req.requestId,
      status: 401,
    });
  }

  if (!requestBody.username) {
    logger.error(`${HttpResponseStatusDesc.BadRequest}: username not found`);
    logger.info('[validatorAuthLogin]', ELogStage.end);

    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.BadRequest}: username not found`,
      isSuccess: false,
      requestId: req.requestId,
      status: 401,
    });
  }

  if (!requestBody.password) {
    logger.error(`${HttpResponseStatusDesc.BadRequest}: password not found`);
    logger.info('[validatorAuthLogin]', ELogStage.end);

    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.BadRequest}: password not found`,
      isSuccess: false,
      requestId: req.requestId,
      status: 401,
    });
  }

  if (!requestBody.captchaToken) {
    logger.error(
      `${HttpResponseStatusDesc.BadRequest}: .captchaToken not found`,
    );
    logger.info('[validatorAuthLogin]', ELogStage.end);

    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.BadRequest}: .captchaToken not found`,
      isSuccess: false,
      requestId: req.requestId,
      status: 401,
    });
  }

  logger.info('[validatorAuthLogin]', ELogStage.end);

  return next();
};

export default validatorAuthLogin;
