import {Response, NextFunction} from 'express';
import {BaseResource} from '../resources/BaseResource';
import {logger} from '../../utils/LoggerUtils';
import {IMainRequest} from '../requests/MainRequest';
import {
  HttpResponseStatus,
  HttpResponseStatusDesc,
} from '../../enums/HttpResponseEnum';

export function validatorParamPeriod(
  req: IMainRequest,
  res: Response,
  next: NextFunction,
): void {
  const executePeriod = req.params.period || undefined;
  // Example value: req.params.period = "2025-04"

  if (!executePeriod) {
    logger.error(
      `${HttpResponseStatusDesc.BadRequest}: execute period not found!`,
    );
    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.BadRequest}: execute period not found!`,
      isSuccess: false,
      requestId: req.requestId,
      status: HttpResponseStatus.BadRequest,
    });
  }
  const periodParts = executePeriod.split('-');

  if (periodParts.length !== 2) {
    logger.error(
      `${HttpResponseStatusDesc.BadRequest}: Invalid period format!`,
    );
    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.BadRequest}: Invalid period format! The format should be YYYY-MM.`,
      isSuccess: false,
      requestId: req.requestId,
      status: HttpResponseStatus.BadRequest,
    });
  }

  const year = periodParts[0];
  const month = periodParts[1];

  if (!/^\d{4}$/.test(year)) {
    logger.error(`${HttpResponseStatusDesc.BadRequest}: Invalid year format!`);
    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.BadRequest}: Invalid year format! The year should be a 4-digit number.`,
      isSuccess: false,
      requestId: req.requestId,
      status: HttpResponseStatus.BadRequest,
    });
  }

  const monthNumber = parseInt(month, 10);
  if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    logger.error(`${HttpResponseStatusDesc.BadRequest}: Invalid month!`);
    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.BadRequest}: Invalid month! The month should be between 01 and 12.`,
      isSuccess: false,
      requestId: req.requestId,
      status: HttpResponseStatus.BadRequest,
    });
  }

  return next();
}
