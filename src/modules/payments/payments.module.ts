import { Module } from '@nestjs/common';

import PaymentsService from './payments.service';
import PaymentsController from './payments.controller';

import KafkaService from '../kafka/kafka.service';

@Module({
	controllers: [PaymentsController],
	exports: [PaymentsService],
	providers: [PaymentsService, KafkaService],
})
export default class PaymentsModule {}
