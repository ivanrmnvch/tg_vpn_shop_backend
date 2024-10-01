import { Injectable } from '@nestjs/common';
import PostgresService from '../postgres/postgres.service';

import UserDto from './dto/user.dto';

@Injectable()
export default class UserService {
	constructor(
		// private logger: CustomLogger,
		private pgService: PostgresService
	) {}

	// todo логирование
	// todo валидация
	async addUser(body: UserDto) {
		const { id, first_name, username, lang } = body;
		await this.pgService.query(
			`
        INSERT INTO tg_users(id, first_name, username, lang)
        VALUES ($1::bigint, $2::varchar, $3::varchar, $4::varchar)
        ON CONFLICT DO NOTHING;
      `,
			[id, first_name, username, lang]
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
