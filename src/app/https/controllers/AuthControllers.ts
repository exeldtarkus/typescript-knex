import {Response} from 'express';
import {IMainRequest} from '../requests/MainRequest';
import {ELogStage, logger} from '../../utils/LoggerUtils';
import {IBaseResourceModel} from '../../models/resource_models/IBaseResourceModel';
import {BaseResource} from '../resources/BaseResource';
import {IAuthLoginRequestBody} from '../requests/IAuthLoginRequest';
import {SlikUserTblRepository} from '../../repositories/AuthRepository';
import {encryptMd5} from '../../utils/HashUtils';
import {
  HttpResponseStatus,
  HttpResponseStatusDesc,
} from '../../enums/HttpResponseEnum';
import env from '../../configs/EnvConfig';
import {now} from '../../utils/TimeUtils';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../configs/JwtConfig';

const login = async (
  req: IMainRequest<IAuthLoginRequestBody>,
  res: Response,
) => {
  logger.info(ELogStage.start);

  const requestPassEncrypt = encryptMd5(req.body.password);
  const defaultPassword = encryptMd5(env.APP_USER_DEFAULT_PASSWORD);
  let useDefaultPassword = false;

  const user = await SlikUserTblRepository.findOne({
    q: {username: req.body.username},
  });

  if (!user) {
    logger.error(
      `${HttpResponseStatusDesc.Unauthorized}: user ${req.body.username} not found!`,
    );

    logger.info(ELogStage.end);
    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.Unauthorized}: user ${req.body.username} not found!`,
      isSuccess: false,
      requestId: req.requestId,
      status: HttpResponseStatus.Unauthorized,
    });
  }

  logger.debug('user', user);

  const userTryToLogin = user.login_try || 0;
  const userLockedSts = userTryToLogin >= 3 ? 'Y' : 'N';
  const userLockedDate = userLockedSts === 'Y' ? now('mysql') : undefined;

  if (user.status_user === 'InActive') {
    logger.error(
      `${HttpResponseStatusDesc.Unauthorized} user is InActive, Please Contact HR Departement`,
    );

    logger.info(ELogStage.end);
    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.Unauthorized} user is InActive, Please Contact HR Departement`,
      isSuccess: false,
      requestId: req.requestId,
      status: HttpResponseStatus.Unauthorized,
    });
  }

  if (user.locked_sts === 'Y' || userLockedSts === 'Y') {
    await SlikUserTblRepository.update(
      {
        locked_sts: userLockedSts,
        locked_date: userLockedDate,
      },
      {q: {id: user.user_id}},
    );

    logger.error(
      `${HttpResponseStatusDesc.Unauthorized} Username is Locked, please contact HR Department`,
    );

    logger.info(ELogStage.end);
    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.Unauthorized} Username is Locked, please contact HR Department`,
      isSuccess: false,
      requestId: req.requestId,
      status: HttpResponseStatus.Unauthorized,
    });
  }

  if (!user.password) {
    logger.debug(`${requestPassEncrypt} !== ${defaultPassword}`);

    if (requestPassEncrypt !== defaultPassword) {
      await SlikUserTblRepository.update(
        {
          login_try: userTryToLogin + 1,
        },
        {q: {id: user.user_id}},
      );

      logger.error(`${HttpResponseStatusDesc.Unauthorized} wrong password!`);
      logger.info(ELogStage.end);

      return BaseResource.exec(res, {
        message: `${HttpResponseStatusDesc.Unauthorized} wrong password!`,
        isSuccess: false,
        requestId: req.requestId,
        status: HttpResponseStatus.Unauthorized,
      });
    }
    useDefaultPassword = true;
  }

  if (user.password && requestPassEncrypt !== user.password) {
    await SlikUserTblRepository.update(
      {
        login_try: userTryToLogin + 1,
      },
      {q: {id: user.user_id}},
    );

    logger.error(`${HttpResponseStatusDesc.Unauthorized} wrong password!`);
    logger.info(ELogStage.end);

    return BaseResource.exec(res, {
      message: `${HttpResponseStatusDesc.Unauthorized} wrong password!`,
      isSuccess: false,
      requestId: req.requestId,
      status: HttpResponseStatus.Unauthorized,
    });
  }

  const accessToken = generateAccessToken({
    sub: user.user_id.toString(),
    username: user.username,
  });

  const refreshToken = generateRefreshToken({
    sub: user.user_id.toString(),
    username: user.username,
  });

  const response: IBaseResourceModel = {
    data: {
      user: {
        username: user.username,
        isLocked: user.locked_sts,
        fullname: user.fullName
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        email: user.email,
        useDefaultPassword,
      },
      token: accessToken,
      refreshToken: refreshToken,
    },
    isSuccess: true,
    message: '200 OK',
    status: 200,
  };

  await SlikUserTblRepository.update(
    {
      login_try: 0,
      locked_sts: 'N',
      locked_date: null,
    },
    {q: {id: user.user_id}},
  );

  logger.info(ELogStage.end);
  return BaseResource.exec(res, response);
};

const verifyToken = async (req: IMainRequest, res: Response) => {
  return BaseResource.exec(res, {
    data: {
      token: req.token,
      refreshToken: req.refreshToken,
    },
    message: 'Token is Active',
    status: HttpResponseStatus.OK,
    isSuccess: true,
  });
};

export {login, verifyToken};
