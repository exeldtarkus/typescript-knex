/* eslint-disable @typescript-eslint/no-floating-promises */
import {ojkUploadDbConnection as db} from '../configs/KnexConfig';
import {IRepository} from './IRepository';
import {
  ISlikF01TblQueryOutput,
  ISlikF01TblQueryParams,
  ISlikF01TblUpdatedParams,
} from '../models/repository_models/SlikF01TblRepositoryModel';
import {logger} from '../utils/LoggerUtils';

const tableName = 'slik_f01_tbl';

class F01TblRepository implements IRepository {
  private static index(
    param: ISlikF01TblQueryParams,
  ): Promise<ISlikF01TblQueryOutput[]> {
    const query = db<ISlikF01TblQueryOutput>(tableName);

    if (param.q) {
      if (param.q.cif) {
        query.andWhere('Nomor_CIF_Debitur', param.q.cif);
      }

      if (param.q.flagDetail) {
        query.andWhere('Flag_Detail', param.q.flagDetail);
      }

      if (param.q.period) {
        query.andWhere('Period', param.q.period);
      }

      if (param.q.periodYear) {
        query.andWhere(
          db.raw('SUBSTRING(??, 1, 4)', ['Period']),
          '=',
          param.q.periodYear.toString(),
        );
      }
    }

    if (param.limit) {
      query.limit(param.limit);
    }

    if (param.offset) {
      query.offset(param.offset);
    }

    if (param.groupBy && param.groupBy.length > 0) {
      query.groupBy(...param.groupBy);
    }

    if (param.orderBy) {
      query.orderBy(param.orderBy.column.toString(), param.orderBy.direction);
    }

    if (param.selectedColumns && param.selectedColumns.length > 0) {
      query.select(...param.selectedColumns);
    }

    if (param.count && param.count.length > 0) {
      param.count.map(item => {
        query.count(item?.selected || '*', {as: item.alias});
      });
    }

    logger.debug('[F01TblRepository] - [Query]', query.toQuery());
    return query;
  }

  static async findAll(
    param: ISlikF01TblQueryParams,
  ): Promise<ISlikF01TblQueryOutput[]> {
    return await this.index(param);
  }

  static async findOne(
    param: ISlikF01TblQueryParams,
  ): Promise<ISlikF01TblQueryOutput | undefined> {
    const results = await this.index({...param, limit: 1});
    return results[0];
  }

  static save(data: ISlikF01TblQueryOutput): Promise<number[]> {
    return db<any>(tableName).insert(data);
  }

  static update(
    data: ISlikF01TblUpdatedParams,
    condition: ISlikF01TblQueryParams,
  ): Promise<number> {
    let query = db<any>(tableName);

    if (condition.q) {
      if (condition.q.id) {
        query = query.where('user_id', condition.q.id);
      }
    }

    const execute = query.update(data);

    logger.debug('[F01TblRepository] - [update]', execute.toQuery());
    return execute;
  }
}

export {F01TblRepository};
