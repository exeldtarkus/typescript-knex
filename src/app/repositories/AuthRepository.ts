/* eslint-disable @typescript-eslint/no-floating-promises */
import {ojkUploadDbConnection as db} from '../configs/KnexConfig';
import {IRepository} from './IRepository';
import {
  ISlikUserTblQueryParams,
  ISlikUserTblQueryOutput,
  ISlikUserTblUpdatedParams,
} from '../models/repository_models/SlikUserTblRepositoryModel';
import {Knex} from 'knex';
import KnexRepositoryBase from './KnexRepositoryBase';

const tableName = 'slik_user_tbl';

class SlikUserTblRepository implements IRepository {
  private static index(param: ISlikUserTblQueryParams, trx?: Knex.Transaction) {
    const query = KnexRepositoryBase.Init<ISlikUserTblQueryOutput>(
      db,
      tableName,
      trx,
    );

    if (param.q) {
      if (param.q.id) {
        query.andWhere('user_id', param.q.id);
      }

      if (param.q.username) {
        query.andWhere('username', param.q.username);
      }
    }

    return KnexRepositoryBase.Inqury(query, param);
  }

  static async findAll(
    param: ISlikUserTblQueryParams,
    trx?: Knex.Transaction,
  ): Promise<ISlikUserTblQueryOutput[]> {
    return this.index(param, trx);
  }

  static async findOne(
    param: ISlikUserTblQueryParams,
    trx?: Knex.Transaction,
  ): Promise<ISlikUserTblQueryOutput | undefined> {
    const query = await this.index({...param, limit: 1}, trx);
    return query[0] || undefined;
  }

  static save(
    data: ISlikUserTblQueryOutput,
    trx?: Knex.Transaction,
  ): Promise<number[]> {
    return KnexRepositoryBase.Insert(
      KnexRepositoryBase.Init(db, tableName, trx),
      data,
    );
  }

  static update(
    data: ISlikUserTblUpdatedParams,
    condition: ISlikUserTblQueryParams,
    trx?: Knex.Transaction,
  ): Promise<number> {
    const query = KnexRepositoryBase.Init<ISlikUserTblUpdatedParams>(
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

export {SlikUserTblRepository};
