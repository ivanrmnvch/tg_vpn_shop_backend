import { PoolConfig } from 'pg';

/**
 * Конфигурация БД postgres
 */
export default (): PoolConfig => ({
	host: process.env.POSTGRES_HOST,
	user: process.env.POSTGRES_USER,
	port: +process.env.POSTGRES_PORT || 5432,
	password: process.env.POSTGRES_PASSWORD,
	min: +process.env.POSTGRES_POOL_MIN || 0,
	max: +process.env.POSTGRES_POOL_MAX || 10,
	statement_timeout: +process.env.POSTGRES_STATEMENT_TIMEOUT || 30000,
	database: process.env.POSTGRES_DB,
});
