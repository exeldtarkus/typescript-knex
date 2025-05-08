import {knex} from 'knex';
import {dbOjkUpload} from './DatabasesConfig';

const ojkUploadDbConnection = knex({
  client: 'mysql2',
  connection: {
    user: dbOjkUpload.username,
    host: dbOjkUpload.host,
    port: dbOjkUpload.port,
    database: dbOjkUpload.db,
    password: dbOjkUpload.password,
  },
  pool: {
    min: 2, // Jumlah koneksi minimum dalam pool
    max: 1000, // Jumlah koneksi maksimum dalam pool
    acquireTimeoutMillis: 60000, // Waktu tunggu untuk mengambil koneksi dari pool (dalam milidetik)
    createTimeoutMillis: 3000, // Waktu tunggu untuk membuat koneksi baru (dalam milidetik)
    idleTimeoutMillis: 10000, // Waktu tunggu sebelum koneksi idle (tidak digunakan) dihancurkan (dalam milidetik)
  },
});

export {ojkUploadDbConnection};
