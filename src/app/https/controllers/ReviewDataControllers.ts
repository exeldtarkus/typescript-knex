import {Response} from 'express';
import {IMainRequest} from '../requests/MainRequest';
import {ELogStage, logger} from '../../utils/LoggerUtils';
import {IBaseResourceModel} from '../../models/resource_models/IBaseResourceModel';
import {BaseResource} from '../resources/BaseResource';
import {
  HttpResponseStatus,
  HttpResponseStatusDesc,
} from '../../enums/HttpResponseEnum';
import {D01TblRepository} from '../../repositories/D01Repository';
import {ESortDirection} from '../../repositories/IRepository';
import {D01P1TblRepository} from '../../repositories/D01P1TblRepository';

const activePeriod = async (req: IMainRequest, res: Response) => {
  logger.info(ELogStage.start);

  const getListPeriod = await D01TblRepository.findAll({
    selectedColumns: ['Period'],
    groupBy: ['Period'],
    orderBy: {column: 'Period', direction: ESortDirection.Descending},
  });

  logger.info('getListPeriod', getListPeriod);
  const periods = getListPeriod.map(item => item.Period);

  const response: IBaseResourceModel = {
    data: periods,
    isSuccess: true,
    message: HttpResponseStatusDesc.OK,
    status: HttpResponseStatus.OK,
  };

  logger.info(ELogStage.end);
  return BaseResource.exec(res, response);
};

const countMisVsP1 = async (req: IMainRequest, res: Response) => {
  logger.info(ELogStage.start);

  const executePeriod = req.params.period!;

  const [d01NoCifDebiturCount] = await Promise.all([
    D01TblRepository.findAll({
      q: {
        period: executePeriod,
      },
      groupBy: ['Period'],
      count: [{alias: 'total_data', selected: 'Nomor_CIF_Debitur'}],
    }),
    D01P1TblRepository.findAll({}),
  ]);

  logger.debug('d01NoCifDebiturCount', d01NoCifDebiturCount);

  const response: IBaseResourceModel = {
    data: d01NoCifDebiturCount,
    isSuccess: true,
    message: HttpResponseStatusDesc.OK,
    status: HttpResponseStatus.OK,
  };

  logger.info(ELogStage.end);
  return BaseResource.exec(res, response);
};

export {activePeriod, countMisVsP1};
