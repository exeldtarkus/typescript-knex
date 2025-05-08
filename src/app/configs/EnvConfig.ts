/* eslint-disable node/no-process-env */
import {z} from 'zod';
import dotenv from 'dotenv';
import {logger} from '../utils/LoggerUtils';

dotenv.config();

// === ENV SCHEMA ===
const envSchema = z.object({
  // === APP CONFIG ===
  APP_ENV: z.enum(['dev', 'production', 'test']),
  APP_DEBUG: z
    .string()
    .transform(val => val === 'true')
    .pipe(z.boolean()),
  APP_URL: z.string().url(),
  APP_PORT: z.string().default('8016'),
  APP_STATIC_TOKEN: z.string(),

  // === JWT & TOKENS ===
  APP_ACCESS_TOKEN_SECRET: z.string(),
  APP_REFRESH_TOKEN_SECRET: z.string(),
  APP_USER_DEFAULT_PASSWORD: z.string(),

  // === ALIYUN ===
  ALIYUN_HOST: z.string().url(),

  // === DATABASE ===
  DB_HOST: z.string(),
  DB_HOST_READ: z.string(),
  DB_HOST_PORT: z.string().default('3306'),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  DB_PORT: z.string().default('3306'),
});

// === CLASS UNTUK MENGELOLA ENV ===
class EnvironmentManager {
  private env: Record<string, any>;

  constructor() {
    // Parsing dan validasi env dengan zod
    const _env = envSchema.safeParse(process.env);
    if (!_env.success) {
      console.error('❌ Invalid environment variables:', _env.error.format());
      throw new Error('Invalid or missing environment variables');
    }

    // Simpan env yang valid
    this.env = _env.data;
  }

  // Mengembalikan env yang sudah tervalidasi
  getEnv() {
    return this.env;
  }

  // Fungsi untuk memeriksa keberadaan variabel lingkungan yang hilang
  check() {
    const missingKeys: string[] = [];

    // Memeriksa apakah ada variabel lingkungan yang hilang atau kosong
    for (const key in this.env) {
      const value = this.env[key as keyof typeof this.env];
      const isEmpty =
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '');

      if (isEmpty) {
        missingKeys.push(key);
      }
    }

    if (missingKeys.length > 0) {
      const message = `❌ Failed - Missing env vars - ${missingKeys.join(', ')}`;
      logger.error(message);
      throw new Error(message);
    }

    logger.info('✅ [Open]  : Env file is loaded!');
  }
}

const EnvManager = new EnvironmentManager();
const env = EnvManager.getEnv();

export default env;
export {EnvManager};
