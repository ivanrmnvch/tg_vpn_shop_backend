import { Injectable } from '@nestjs/common';
import PostgresService from '../postgres/postgres.service';

import UserDto from '../../common/dto/user.dto';

@Injectable()
export default class VpnServicesService {
	constructor(
		// private logger: CustomLogger,
		private pgService: PostgresService
	) {}

	async getUserMeta(id: number) {
		const [meta] = await this.pgService.query(
			`
				SELECT trial FROM tg_users_meta WHERE id = $1::bigint;
			`,
			[id]
		);
		return meta;
	}

	// todo логирование
	// todo валидация
	async addUser(body: UserDto) {
		const { id, firstName, userName, lang } = body;
		await this.pgService.query(
			`
        INSERT INTO tg_users(id, first_name, username, lang)
        VALUES ($1::bigint, $2::varchar, $3::varchar, $4::varchar)
        ON CONFLICT DO NOTHING;
      `,
			[id, firstName, userName, lang]
		);
	}

	async checkUser(id: number): Promise<boolean> {
		const [{ exists }] = await this.pgService.query<{ exists: boolean }>(
			'SELECT EXISTS(SELECT 1 FROM tg_users WHERE id = $1::bigint);',
			[id]
		);
		return exists;
	}
}
