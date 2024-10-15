import { Module } from '@nestjs/common';

import PaymentsService from './payments.service';
import PaymentsController from './payments.controller';

@Module({
	controllers: [PaymentsController],
	exports: [PaymentsService],
	providers: [PaymentsService],
})
export default class PaymentsModule {}
