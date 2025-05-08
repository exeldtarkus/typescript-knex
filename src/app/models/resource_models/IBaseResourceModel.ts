import {HttpResponseStatus} from '../../enums/HttpResponseEnum';

interface IBaseResourceModel {
  data?: any;
  requestId?: string;
  message: string;
  timestamp?: string;
  status: HttpResponseStatus | number;
  isSuccess: boolean;
}

export {IBaseResourceModel};
