import env from './EnvConfig';

const appConfig = {
  debug: env.APP_DEBUG === true,
};

export {appConfig as config};
