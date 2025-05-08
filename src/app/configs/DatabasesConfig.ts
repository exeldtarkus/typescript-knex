import env from './EnvConfig';

const dbOjkUpload = {
  host: env.DB_HOST,
  host_read: env.DB_HOST_READ,
  port: Number(env.DB_HOST_PORT),
  db: env.DB_DATABASE,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
};

export {dbOjkUpload};
