import { Injectable } from '@nestjs/common';
import PostgresService from '../postgres/postgres.service';
import KafkaService from '../kafka/kafka.service';

import PaymentsDto from './dto/payments.dto';

@Injectable()
export default class PaymentsService {
	constructor(
		// private logger: CustomLogger,
		private pgService: PostgresService,
		private kafka: KafkaService
	) {}

	// todo логирование
	// todo валидация
	async savePayment(body: PaymentsDto) {
		const { tgPayId, providePayId, tgId, serviceCode, totalAmount, date } =
			body;

		await this.pgService.query(
			`
        INSERT INTO payments(
					tg_payment_charge_id,
					provider_payment_charge_id,
					tg_id,
					total_amount,
					date
				)
        VALUES ($1::varchar, $2::uuid, $3::bigint, $4::numeric, $5::integer);
      `,
			[tgPayId, providePayId, tgId, totalAmount, date]
		);

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

		const [{ clientId }] = await this.pgService.query<{ clientId: string }>(
			'SELECT client_id as "clientId" FROM tg_users_meta WHERE id = $1::bigint;',
			[tgId]
		);

		const kafkaRes = await this.kafka.sendMessage('vpn-events-test123', clientId);
		console.log('kafkaRes', kafkaRes);
	}
}
