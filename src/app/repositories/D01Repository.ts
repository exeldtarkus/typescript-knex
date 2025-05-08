/* eslint-disable @typescript-eslint/no-floating-promises */
import {ojkUploadDbConnection as db} from '../configs/KnexConfig';
import {IRepository} from './IRepository';
import {
  ISlikD01TblQueryOutput,
  ISlikD01TblQueryParams,
  ISlikD01TblUpdatedParams,
} from '../models/repository_models/SlikD01TblRepositoryModel';
import {Knex} from 'knex';
import KnexRepositoryBase from './KnexRepositoryBase';

const tableName = 'slik_d01_tbl';

class D01TblRepository implements IRepository {
  private static index(param: ISlikD01TblQueryParams, trx?: Knex.Transaction) {
    const query = KnexRepositoryBase.Init<D01TblRepository>(db, tableName, trx);

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
    return KnexRepositoryBase.Inqury(query, param);
  }

  static async findAll(
    param: ISlikD01TblQueryParams,
    trx?: Knex.Transaction,
  ): Promise<ISlikD01TblQueryOutput[]> {
    return this.index(param, trx);
  }

  static async findOne(
    param: ISlikD01TblQueryParams,
    trx?: Knex.Transaction,
  ): Promise<ISlikD01TblQueryOutput | undefined> {
    const query = await this.index({...param, limit: 1}, trx);
    return query[0] || undefined;
  }

  static save(
    data: ISlikD01TblQueryOutput,
    trx?: Knex.Transaction,
  ): Promise<number[]> {
    return KnexRepositoryBase.Insert(
      KnexRepositoryBase.Init(db, tableName, trx),
      data,
    );
  }

  static update(
    data: ISlikD01TblUpdatedParams,
    condition: ISlikD01TblQueryParams,
    trx?: Knex.Transaction,
  ): Promise<number> {
    const query = KnexRepositoryBase.Init<ISlikD01TblUpdatedParams>(
      db,
      tableName,
      trx,
    );

    if (condition.q) {
      if (condition.q.id) {
        query.where('user_id', condition.q.id);
      }
    }

    return KnexRepositoryBase.Update(query, data);
  }
}

export {D01TblRepository};
