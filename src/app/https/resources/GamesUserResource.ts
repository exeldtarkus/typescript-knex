import {BaseResource} from './BaseResource';
import {IGamesUserResourcesModels} from '../../models/resource_models/IGamesUserResourcesModels';
import {IGameUserQueryOutput} from '../../models/repository_models/GameUserRepositoryModel';

class GamesUserResource extends BaseResource {
  static transformer(
    data: IGameUserQueryOutput | IGameUserQueryOutput[],
  ): Array<IGamesUserResourcesModels> | IGamesUserResourcesModels {
    const result = (row: IGameUserQueryOutput): IGamesUserResourcesModels => ({
      id: row.uuid,
      idGames: String(row.id_games),
      score: row.score,
      noHandphone: row.no_handphone,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    });

    if (Array.isArray(data)) {
      return data.map(result);
    }

    return result(data);
  }
}

export {GamesUserResource};
