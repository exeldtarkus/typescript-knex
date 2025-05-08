/* eslint-disable no-console */
import {Response, NextFunction} from 'express';
import {ELogStage, logger, init as loggerInit} from '../../utils/LoggerUtils';
import {IMainRequest} from '../requests/MainRequest';

const loggerMiddleware = (
  req: IMainRequest,
  res: Response,
  next: NextFunction,
) => {
  const startTime = Date.now();
  loggerInit(req);

  logger.info('[times]', ELogStage.start);

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info('[times]', ELogStage.end, `${duration}ms`);
    loggerInit(req, true);
    logger.debug(`--- [Request ${req.requestId} End] ---`);
  });

  next();
};

export default loggerMiddleware;
