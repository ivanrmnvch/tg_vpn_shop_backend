import { Injectable } from '@nestjs/common';
import PostgresService from 'modules/postgres/postgres.service';

@Injectable()
export default class HealthcheckService {
	constructor(
		// private logger: CustomLogger,
		private pgService: PostgresService
	) {}

	// todo логирование
	// todo валидация
	async healthcheck() {
		await this.pgService.query('SELECT 1 FROM servers LIMIT 1;');
	}
}
