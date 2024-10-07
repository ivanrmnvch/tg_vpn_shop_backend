import { Injectable } from '@nestjs/common';
import PostgresService from '../postgres/postgres.service';

import TransactionDto from './dto/transaction.dto';

@Injectable()
export default class TransactionService {
	constructor(
		// private logger: CustomLogger,
		private pgService: PostgresService
	) {}

	// todo логирование
	// todo валидация
	async addTransaction(body: TransactionDto) {
		const {
			tgPayId,
			providePayId,
			tgId,
			serviceCode,
			totalAmount,
			date
		} = body;

		await this.pgService.query(
			`
        INSERT INTO transaction(
					tg_payment_charge_id,
					provider_payment_charge_id,
					tg_id,
					service_code,
					total_amount,
					date
				)
        VALUES ($1::varchar, $2::uuid, $3::bigint, $4::varchar, $5::numeric, $6::integer)
        ON CONFLICT DO NOTHING;
      `,
			[tgPayId, providePayId, tgId, serviceCode, totalAmount, date]
		);
		console.log('success');
	}
}
