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
import {F01TblRepository} from '../../repositories/F01Repository';
import {monthsOfYear} from '../../utils/TimeUtils';
import {ESortDirection} from '../../repositories/IRepository';

const statistics = async (req: IMainRequest, res: Response) => {
  logger.info(ELogStage.start);

  const year = parseInt(req.params.year!, 10);

  const [slikD01, slikF01] = await Promise.all([
    D01TblRepository.findAll({
      q: {
        periodYear: year,
      },
      selectedColumns: ['Period'],
      groupBy: ['Period'],
      count: [{alias: 'total_data', selected: '*'}],
      orderBy: {
        column: 'Period',
        direction: ESortDirection.Descending,
      },
    }),
    F01TblRepository.findAll({
      q: {
        periodYear: year,
      },
      selectedColumns: ['Period'],
      groupBy: ['Period'],
      count: [{alias: 'total_data', selected: '*'}],
      orderBy: {
        column: 'Period',
        direction: ESortDirection.Descending,
      },
    }),
  ]);

  logger.debug('slikD01', slikD01);
  logger.debug('slikF01', slikF01);

  const result = monthsOfYear.map(item => {
    const monthDataD01 = slikD01.find(
      d => d.Period === `${year}-${String(item.monthNumber).padStart(2, '0')}`,
    );
    const monthDataF01 = slikF01.find(
      f => f.Period === `${year}-${String(item.monthNumber).padStart(2, '0')}`,
    );

    return {
      [item.month]: {
        D01: monthDataD01 ? monthDataD01.total_data : 0,
        F01: monthDataF01 ? monthDataF01.total_data : 0,
      },
    };
  });

  const response: IBaseResourceModel = {
    data: result,
    isSuccess: true,
    message: HttpResponseStatusDesc.OK,
    status: HttpResponseStatus.OK,
  };

  logger.info(ELogStage.end);
  return BaseResource.exec(res, response);
};

const metrics = async (req: IMainRequest, res: Response) => {
  logger.info(ELogStage.start);

  const year = parseInt(req.params.year!, 10);

  const [slikD01, slikF01] = await Promise.all([
    D01TblRepository.findAll({
      q: {
        periodYear: year,
      },
      selectedColumns: ['Period'],
      groupBy: ['Period'],
      count: [{alias: 'total_data', selected: '*'}],
      orderBy: {
        column: 'Period',
        direction: ESortDirection.Descending,
      },
    }),
    F01TblRepository.findAll({
      q: {
        periodYear: year,
      },
      selectedColumns: ['Period'],
      groupBy: ['Period'],
      count: [{alias: 'total_data', selected: '*'}],
      orderBy: {
        column: 'Period',
        direction: ESortDirection.Descending,
      },
    }),
  ]);

  logger.debug('slikD01', slikD01);
  logger.debug('slikF01', slikF01);

  const totalDataD01 = slikD01.reduce(
    (sum, item) => sum + (item.total_data || 0),
    0,
  );

  const totalDataF01 = slikF01.reduce(
    (sum, item) => sum + (item.total_data || 0),
    0,
  );

  const percentageChangeD01 =
    (((slikD01[0]?.total_data || 0) - (slikD01[1]?.total_data || 0)) /
      (slikD01[1]?.total_data || 1)) *
    100;

  const percentageChangeF01 =
    (((slikF01[0]?.total_data || 0) - (slikF01[1]?.total_data || 0)) /
      (slikF01[1]?.total_data || 1)) *
    100;

  const response: IBaseResourceModel = {
    data: {
      d01: {
        lastPeriod: slikD01[0],
        totalAllData: totalDataD01,
        percentage: percentageChangeD01,
        percentageType:
          percentageChangeD01 > 0
            ? 'Up'
            : percentageChangeD01 < 0
              ? 'Down'
              : 'Nothing-Change',
      },
      f01: {
        lastPeriod: slikF01[0],
        totalAllData: totalDataF01,
        percentage: percentageChangeF01,
        percentageType:
          percentageChangeF01 > 0
            ? 'Up'
            : percentageChangeF01 < 0
              ? 'Down'
              : 'Nothing-Change',
      },
    },
    isSuccess: true,
    message: HttpResponseStatusDesc.OK,
    status: HttpResponseStatus.OK,
  };

  logger.info(ELogStage.end);
  return BaseResource.exec(res, response);
};

export {statistics, metrics};
