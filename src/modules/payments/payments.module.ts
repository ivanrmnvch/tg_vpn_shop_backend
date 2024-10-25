import { Module } from '@nestjs/common';

import PaymentsService from './payments.service';
import PaymentsController from './payments.controller';

import KafkaService from '../kafka/kafka.service';
import OrdersService from '../orders/orders.service';
import VpnServicesService from '../vpn_services/vpn_services.service';

@Module({
	controllers: [PaymentsController],
	exports: [PaymentsService],
	providers: [PaymentsService, KafkaService, OrdersService, VpnServicesService],
})
export default class PaymentsModule {}
