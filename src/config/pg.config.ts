import { PoolConfig } from 'pg';

/**
 * Конфигурация БД postgres
 */
export default {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  port: +process.env.POSTGRES_PORT,
  password: process.env.POSTGRES_PASSWORD,
  min: +process.env.POSTGRES_POOL_MIN,
  max: +process.env.POSTGRES_POOL_MAX,
  statement_timeout: +process.env.POSTGRES_STATEMENT_TIMEOUT,
  database: process.env.POSTGRES_DB,
} as PoolConfig;
