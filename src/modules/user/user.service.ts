import { Injectable } from '@nestjs/common';
import PostgresService from '../postgres/postgres.service';

import UserDto from './dto/user.dto';

@Injectable()
export default class UserService {
	constructor(
		// private logger: CustomLogger,
		private pgService: PostgresService
	) {}

	async addUser(body: UserDto) {
		const { id, firstName, userName, lang } = body;
		await this.pgService.query(
			`
        INSERT INTO tg_users(id, first_name, username, lang)
        VALUES ($1::bigint, $2::varchar, $3::varchar, $4::varchar)
        ON CONFLICT (id) DO UPDATE SET
					first_name = excluded.first_name,
					username = excluded.username,
        	lang = excluded.lang,
        	updated_at = now();
      `,
			[id, firstName, userName, lang]
		);
	}
}
