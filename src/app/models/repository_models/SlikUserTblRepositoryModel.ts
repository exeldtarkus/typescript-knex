import {IRepositoryParam} from '../../repositories/IRepository';

type ColumnNames = '*' | keyof ISlikUserTblQueryOutput;
interface ISlikUserTblQueryParams extends IRepositoryParam<ColumnNames> {
  q?: {
    id?: number;
    uuid?: string;
    username?: string;
  };
}

interface ISlikUserTblQueryOutput {
  user_id: number;
  username: string;
  fullName: string;
  password?: string;
  email: string;
  cid_role_access: number;
  birth_date: string;
  join_date: string;
  gender: string;
  sidebar_menu: number;
  login_try: number;
  locked_sts: string;
  locked_date: string;
  status_user: string;
  dashboard: number;
  v_max_page: number;
  sts_detail_hide: number;
  author_date: string;
  author_user: string;
  mandatory: number;
}

interface ISlikUserTblUpdatedParams {
  user_id?: number;
  username?: string;
  fullName?: string;
  password?: string;
  email?: string;
  cid_role_access?: number;
  birth_date?: string;
  join_date?: string;
  gender?: string;
  sidebar_menu?: number;
  login_try?: number;
  locked_sts?: string;
  locked_date?: string | null;
  status_user?: string;
  dashboard?: number;
  v_max_page?: number;
  sts_detail_hide?: number;
  author_date?: string;
  author_user?: string;
  mandatory?: number;
}

export {
  ISlikUserTblQueryParams,
  ISlikUserTblQueryOutput,
  ISlikUserTblUpdatedParams,
};
