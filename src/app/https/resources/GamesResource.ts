import {BaseResource} from './BaseResource';
import {IGamesResourcesModels} from '../../models/resource_models/IGamesResourcesModels';
import {IGameQueryOutput} from '../../models/repository_models/GameRepositoryModel';

class GamesResource extends BaseResource {
  static transformer(
    data: IGameQueryOutput | IGameQueryOutput[],
  ): Array<IGamesResourcesModels> | IGamesResourcesModels {
    const result = (row: IGameQueryOutput): IGamesResourcesModels => ({
      id: row.uuid,
      name: row.name,
      description: row.description,
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

export {GamesResource};
