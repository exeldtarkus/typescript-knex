interface IRepository {
  findAll?: () => any;
  findOne?: () => any;
  create?: () => any;
  update?: () => any;
}

enum ESortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

interface IRepositoryParam<IRepositoryKey = any> {
  q?: {
    id?: number | string;
  };
  selectedColumns?: Array<IRepositoryKey>;
  selectedRaw?: String[];
  whereRaw?: string[];
  limit?: number;
  count?: Array<{
    alias: string;
    selected?: IRepositoryKey;
  }>;
  offset?: number;
  groupBy?: Array<IRepositoryKey>;
  orderBy?: {
    column: IRepositoryKey;
    direction: ESortDirection | 'asc' | 'desc';
  };
}

export {IRepository, IRepositoryParam, ESortDirection};
