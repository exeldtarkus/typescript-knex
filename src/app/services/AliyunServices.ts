import {IRepository} from '../repositories/IRepository';
import axios from 'axios';
import https from 'https';
import {IAliyunResourcesModels} from '../models/resource_models/IAliyunResourcesModels';
import {logger} from '../utils/LoggerUtils';
import env from '../configs/EnvConfig';

const apiClient = axios.create({
  baseURL: env.ALIYUN_HOST,
  timeout: 1000 * 5,
  httpsAgent: new https.Agent({rejectUnauthorized: false}),
});
const logTemplate = '[PortainerServices]';

class AliyunServices implements IRepository {
  static async article(): Promise<IAliyunResourcesModels | null> {
    const response = await apiClient
      .get('/image/data.json', {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
          'Content-Type': 'application/json',
        },
      })
      .catch(err => {
        logger.error(logTemplate, '[article]', '[response]', err);
        throw new Error(`[Axios] - [article] - [Error] - ${err.message}`);
      });

    logger.info(logTemplate, '[article]', '[response]', response.data);
    return response.data;
  }
}

export {AliyunServices};
