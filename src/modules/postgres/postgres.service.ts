// import { CustomLogger } from '@areal/nest-logger';
// import { delayPromise } from '@areal/ts-utils';
import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
// import { HealthCheckError, HealthIndicatorResult } from '@nestjs/terminus';
// import { HealthIndicatorStatus } from '@nestjs/terminus/dist/health-indicator/health-indicator-result.interface';
import { Pool, PoolClient, PoolConfig } from 'pg';

import { DATABASE_CONFIG } from '../../const/tokens';

import { ConfigService } from '@nestjs/config';

/**
 * Сервис для управления базой данных postgres
 *
 * todo мультиконнект к нескольким базам
 */
@Injectable()
export default class PostgresService implements OnModuleInit {
	//OnModuleDestroy
	private pool: Pool;

	private intervalConnectCheck: NodeJS.Timer;

	constructor(
		@Inject(DATABASE_CONFIG) private config: PoolConfig,
		private configService: ConfigService
		// private logger: CustomLogger
	) {
		console.log('config', config);
		this.pool = new Pool(config);
	}

	// /**
	//  * Хук на отключении модуля. Выполняет отключение от БД
	//  */
	// async onModuleDestroy(): Promise<void> {
	//   if (this.intervalConnectCheck) {
	//     clearInterval(this.intervalConnectCheck as unknown as number);
	//     this.intervalConnectCheck = null;
	//   }
	//   await this.pool.end();
	// }
	//
	// /**
	//  * Хук на инициализации модуля. Запускает проверку подключения к БД каждые 15с
	//  */
	async onModuleInit() {
		// todo вынести в docker compose
		await this.pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
		// this.checkConnect(true)
		//   .then(() => {
		//     this.intervalConnectCheck = setInterval(this.checkConnect.bind(this), 15000);
		//   })
		//   .catch(() => null);
	}

	// /**
	//  * Проверка работоспособности подключения к БД для health сервиса
	//  * @param key
	//  */
	// async healthcheck(key: string): Promise<HealthIndicatorResult> {
	//   const result: HealthIndicatorResult = {
	//     [key]: {
	//       status: 'up' as HealthIndicatorStatus,
	//       message: undefined,
	//     },
	//   };
	//   try {
	//     await this.pool.query('SELECT 1+1');
	//     return result;
	//   } catch (e) {
	//     result[key].status = 'down';
	//     result[key].message = e?.response?.data || e?.message || 'unknown';
	//     throw new HealthCheckError('TMS healthcheck error', result);
	//   }
	// }

	// /**
	//  * Проверка подключения к базе данных
	//  * @param recurse
	//  */
	// async checkConnect(recurse = false): Promise<boolean> {
	//   try {
	//     await this.pool.query('SELECT 1+1');
	//     this.logger.log('Database info', PostgresService.name, {
	//       host: this.config.host,
	//       user: this.config.user,
	//       idle: this.pool.idleCount,
	//       waiting: this.pool.waitingCount,
	//       total: this.pool.totalCount,
	//       max: this.config.max,
	//     });
	//     return true;
	//   } catch (error) {
	//     this.logger.error('Database connection error', PostgresService.name, { error });
	//     if (recurse) {
	//       await delayPromise(15000);
	//       return this.checkConnect(recurse);
	//     }
	//     return true;
	//   }
	// }

	/**
	 * Выполнение SQL запроса
	 * @param sql
	 * @param params
	 */
	async query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]> {
		try {
			const result = await this.pool.query<T>(sql, params);
			return result.rows || [];
		} catch (error) {
			// this.logger.error('Error on query execute', PostgresService.name, { error });
			throw error;
		}
	}

	/**
	 * Выполнение транзакции
	 * @param queryFunction
	 */
	async transaction<T>(
		queryFunction: (client: PoolClient) => Promise<T>
	): Promise<T> {
		const client = await this.pool.connect();
		try {
			await client.query('BEGIN');
			const result = await queryFunction(client);
			await client.query('COMMIT');
			return result;
		} catch (error) {
			await client.query('ROLLBACK');
			// this.logger.error('Error on transaction execute', PostgresService.name, { error });
			throw error;
		} finally {
			client.release();
		}
	}
}
