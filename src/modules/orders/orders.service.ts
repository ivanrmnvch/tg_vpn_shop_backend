import { Injectable } from '@nestjs/common';
import PostgresService from '../postgres/postgres.service';

import OrdersDto from './dto/orders.dto';

@Injectable()
export default class OrdersService {
	constructor(
		// private logger: CustomLogger,
		private pgService: PostgresService
	) {}

	// todo логирование
	// todo валидация
	async createOrder(body: OrdersDto) {
		const { providePayId, tgId, serviceCode } = body;

		await this.pgService.query(
			`
				INSERT INTO orders(
					tg_id,
					service_code,
					payment_id,
					end_date
				)
				VALUES ($1::bigint, $2::varchar, $3::uuid,
					CASE $2::varchar
						WHEN 'month' THEN now() + interval '30' day
						WHEN 'six_months' THEN now() + interval '180' day
						ELSE now() + interval '365' day
					END
			 	);
			`,
			[tgId, serviceCode, providePayId]
		);
	}
}
