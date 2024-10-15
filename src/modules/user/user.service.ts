import { Injectable } from '@nestjs/common';
import PostgresService from '../postgres/postgres.service';

import UserDto from '../../common/dto/user.dto';

@Injectable()
export default class UserService {
	constructor(
		// private logger: CustomLogger,
		private pgService: PostgresService
	) {}

	async getUserMeta(id: number) {
		const [meta] = await this.pgService.query(
			`
				SELECT
					(NOT meta.trial AND "order".end_date ISNULL) as "newUser",
					(meta.trial AND meta.trial_end_date > now()) as "activeTrial",
					meta.trial_start_date as "startTrial",
					meta.trial_end_date as "expireTrial",
					coalesce("order".end_date > now(), false) as "activeTariff",
					"order".service_code as tariff,
					"order".start_date as "startTariff",
					"order".end_date as "expireTariff"
				FROM (
						SELECT trial, trial_start_date, trial_end_date
						FROM tg_users_meta
						WHERE id = $1::bigint
					) as meta
				LEFT JOIN (
						SELECT service_code, start_date, end_date FROM orders
						WHERE tg_id = $1::bigint
						ORDER BY created_at DESC LIMIT 1
					) as "order" ON TRUE;
			`,
			[id]
		);
		return meta;
	}

	// todo логирование
	// todo валидация
	// todo проверить, что пользователь обновляется
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

	async checkUser(id: number): Promise<boolean> {
		const [{ exists }] = await this.pgService.query<{ exists: boolean }>(
			'SELECT EXISTS(SELECT 1 FROM tg_users WHERE id = $1::bigint);',
			[id]
		);
		return exists;
	}

	async getTrial(id: number) {
		await this.pgService.query(
			`
				UPDATE tg_users_meta SET 
					trial = true,
					trial_start_date = now(),
					trial_end_date = now() + interval '10' day
				WHERE id = $1::bigint;
			`,
			[id]
		);
	}
}
