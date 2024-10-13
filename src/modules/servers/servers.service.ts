import { Injectable } from '@nestjs/common';
import PostgresService from '../postgres/postgres.service';
import ServersDto from './dto/servers.dto';

@Injectable()
export default class ServersService {
	constructor(
		// private logger: CustomLogger,
		private pgService: PostgresService
	) {}

	async getServers(query: ServersDto) {
		const { limit, offset } = query;
		const servers = await this.pgService.query(
			`
				SELECT 
					name,
					country_code
				FROM servers
				LIMIT $1::integer
				OFFSET $2::integer;
			`,
			[limit || 5, offset || 0]
		);
		const [{ total }] = await this.pgService.query<{ total: number }>(
			'SELECT COUNT(*) as total FROM servers;'
		);
		return {
			data: servers,
			total,
		};
	}
}
