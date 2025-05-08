/* eslint-disable @typescript-eslint/no-floating-promises */
import {ojkUploadDbConnection as db} from '../configs/KnexConfig';
import {IRepository} from './IRepository';
import {
  ISlikF01P2TblQueryOutput,
  ISlikF01P2TblQueryParams,
  ISlikF01P2TblUpdatedParams,
} from '../models/repository_models/SlikF01P2TblRepositoryModel';
import env from '../configs/EnvConfig';
import {Knex} from 'knex';
import KnexRepositoryBase from './KnexRepositoryBase';

const tableName =
  env.APP_ENV === 'dev' ? 'slik_f01_p2_tbl_dev' : 'slik_f01_p2_tbl';

class F01TblRepository implements IRepository {
  private static index(
    param: ISlikF01P2TblQueryParams,
    trx?: Knex.Transaction,
  ) {
    const query = KnexRepositoryBase.Init<ISlikF01P2TblQueryParams>(
      db,
      tableName,
      trx,
    );

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
    param: ISlikF01P2TblQueryParams,
    trx?: Knex.Transaction,
  ): Promise<ISlikF01P2TblQueryOutput[]> {
    return this.index(param, trx);
  }

  static async findOne(
    param: ISlikF01P2TblQueryParams,
    trx?: Knex.Transaction,
  ): Promise<ISlikF01P2TblQueryOutput | undefined> {
    const query = await this.index({...param, limit: 1}, trx);
    return query[0] || undefined;
  }

  static save(
    data: ISlikF01P2TblQueryOutput,
    trx?: Knex.Transaction,
  ): Promise<number[]> {
    return KnexRepositoryBase.Insert(
      KnexRepositoryBase.Init(db, tableName, trx),
      data,
    );
  }

  static update(
    data: ISlikF01P2TblUpdatedParams,
    condition: ISlikF01P2TblQueryParams,
    trx?: Knex.Transaction,
  ): Promise<number> {
    const query = KnexRepositoryBase.Init<ISlikF01P2TblUpdatedParams>(
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

export {F01TblRepository};
