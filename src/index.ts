/* eslint-disable n/no-process-exit */
import app from './app';
import chalk from 'chalk';
import {logger} from './app/utils/LoggerUtils';
import env, {EnvManager} from './app/configs/EnvConfig';
import KnexRepositoryBase from './app/repositories/KnexRepositoryBase';

const port = env.APP_PORT;

process.on('SIGINT', async () => {
  logger.info('💥 [Close] : Shutting down...');
  await KnexRepositoryBase.DestroyDbConnection();
  process.exit(0);
});

app.listen(port, async () => {
  logger.info('⏳ [Open]  : Loading Required Data and File ...');
  EnvManager.check();
  await KnexRepositoryBase.Check();

  logger.info(
    `${chalk.yellow('⚡️')} [server]: Running at`,
    chalk.underline(`http://localhost:${port}`),
  );
  logger.info(
    `${chalk.yellow('🛠️')}  [Mode]  : ${chalk.underline(env.APP_ENV)}`,
  );
});

export default app;
