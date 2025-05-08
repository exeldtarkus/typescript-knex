import {Response} from 'express';
import {IMainRequest} from '../requests/MainRequest';
import {ELogStage, logger} from '../../utils/LoggerUtils';
import {IBaseResourceModel} from '../../models/resource_models/IBaseResourceModel';
import {BaseResource} from '../resources/BaseResource';
import {SlikUserTblRepository} from '../../repositories/AuthRepository';
import {
  HttpResponseStatus,
  HttpResponseStatusDesc,
} from '../../enums/HttpResponseEnum';

const index = async (req: IMainRequest, res: Response) => {
  logger.info(ELogStage.start);

  const user = await SlikUserTblRepository.findOne({
    q: {id: req.userId},
  });

  if (!user) {
    logger.error(
      `${HttpResponseStatusDesc.BadRequest}: user ${req.body.username} not found!`,
    );

    logger.info(ELogStage.end);
    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.BadRequest}: user ${req.body.username} not found!`,
      isSuccess: false,
      requestId: req.requestId,
      status: HttpResponseStatus.BadRequest,
    });
  }

  logger.debug('user', user);

  const response: IBaseResourceModel = {
    data: {
      username: user.username,
      isLocked: user.locked_sts,
      fullName: user.fullName
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      email: user.email,
    },
    isSuccess: true,
    message: '200 OK',
    status: 200,
  };

  logger.info(ELogStage.end);
  return BaseResource.exec(res, response);
};

export {index};
