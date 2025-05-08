/* eslint-disable no-console */
import chalk from 'chalk';
import moment from 'moment';
import {IMainRequest} from '../https/requests/MainRequest';
import env from '../configs/EnvConfig';

enum ELogLevels {
  error = '[ERROR]',
  warn = '[WARNING]',
  info = '[INFO]',
  http = '[HTTP]',
  debug = '[DEBUG]',
}

enum ELogStage {
  start = '[START]',
  end = '[END]',
}

let loggerPrefix: string | null = null;

const init = (req: IMainRequest, clear?: boolean) => {
  loggerPrefix = `${req.logTemplate}`;

  if (clear) loggerPrefix = null;
};

const loggerConfig = (logLevel: ELogLevels, ...str: any[]) => {
  if (str.length === 0) return;

  const mappingStr = [];

  for (const itemStr of str) {
    let convertToString = '';
    try {
      if (itemStr instanceof Error) {
        return console.log(
          chalk.red(
            `${ELogLevels.error} - [${moment().format(
              'YYYY-MM-DD HH:mm:ss',
            )}] | `,
          ),
          itemStr,
        );
      }

      if (typeof itemStr !== 'string') {
        convertToString = JSON.stringify(itemStr);
      } else {
        convertToString = itemStr;
      }
    } catch (err) {
      return '';
    }
    mappingStr.push(convertToString);
  }

  const fullStr = mappingStr.join(' - ');

  switch (logLevel) {
    case ELogLevels.info: {
      return console.log(
        chalk.green(`${ELogLevels.info}    | `),
        loggerPrefix ? `${loggerPrefix} - ` : '',
        fullStr,
      );
    }

    case ELogLevels.warn: {
      return console.log(
        chalk.yellow(`${ELogLevels.warn} | `),
        loggerPrefix ? `${loggerPrefix} - ` : '',
        fullStr,
      );
    }

    case ELogLevels.debug: {
      if (env.APP_DEBUG === true) {
        return console.log(
          chalk.magenta(`${ELogLevels.debug}   | `),
          loggerPrefix ? `${loggerPrefix} - ` : '',
          fullStr,
        );
      }
      break;
    }

    case ELogLevels.error: {
      return console.log(
        chalk.red(
          `${ELogLevels.error} - [${moment().format(
            'YYYY-MM-DD HH:mm:ss',
          )}] | `,
        ),
        loggerPrefix ? `${loggerPrefix} - ` : '',
        fullStr,
      );
    }

    default: {
      return console.log(chalk.red('[ERROR] - [logLevel] - [NOT FOUND]'));
    }
  }
};

const logger = () => {};

logger.info = (...str: any[]) => {
  return loggerConfig(ELogLevels.info, ...str);
};

logger.warn = (...str: any[]) => {
  return loggerConfig(ELogLevels.warn, ...str);
};

logger.error = (...str: any[]) => {
  return loggerConfig(ELogLevels.error, ...str);
};

logger.debug = (...str: any[]) => {
  return loggerConfig(ELogLevels.debug, ...str);
};

export {logger, ELogStage, init};
