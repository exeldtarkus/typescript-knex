import {Response, NextFunction} from 'express';
import {BaseResource} from '../resources/BaseResource';
import {logger} from '../../utils/LoggerUtils';
import {IMainRequest} from '../requests/MainRequest';
import {
  HttpResponseStatus,
  HttpResponseStatusDesc,
} from '../../enums/HttpResponseEnum';

export function validatorParamYear(
  req: IMainRequest,
  res: Response,
  next: NextFunction,
): void {
  const executeYear = req.params.year || undefined;

  if (!executeYear) {
    logger.error(
      `${HttpResponseStatusDesc.BadRequest}: execute year not found!`,
    );
    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.BadRequest}: execute year not found!`,
      isSuccess: false,
      requestId: req.requestId,
      status: HttpResponseStatus.BadRequest,
    });
  }

  const year = parseInt(executeYear, 10);

  if (isNaN(year)) {
    logger.error(`${HttpResponseStatusDesc.BadRequest}: Invalid year format!`);
    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.BadRequest}: Invalid year format!`,
      isSuccess: false,
      requestId: req.requestId,
      status: HttpResponseStatus.BadRequest,
    });
  }

  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    logger.error(
      `${HttpResponseStatusDesc.BadRequest}: Year out of valid range!`,
    );
    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.BadRequest}: Year out of valid range!`,
      isSuccess: false,
      requestId: req.requestId,
      status: HttpResponseStatus.BadRequest,
    });
  }

  return next();
}
