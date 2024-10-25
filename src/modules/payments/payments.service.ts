import { Injectable } from '@nestjs/common';
import OrdersService from '../orders/orders.service';
import PostgresService from '../postgres/postgres.service';
import KafkaService from '../kafka/kafka.service';
import VpnServicesService from '../vpn_services/vpn_services.service';

import PaymentsDto from './dto/payments.dto';

@Injectable()
export default class PaymentsService {
	constructor(
		// private logger: CustomLogger,
		private pgService: PostgresService,
		private kafka: KafkaService,
		private ordersService: OrdersService,
		private vpnServicesService: VpnServicesService
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

		await this.ordersService.createOrder({
			tgId,
			serviceCode,
			providePayId,
		});

		const vpnClientId = await this.vpnServicesService.getVPNClientId(tgId);

		await this.kafka.addNewVPNClient({ tgId, vpnClientId });
	}
}
