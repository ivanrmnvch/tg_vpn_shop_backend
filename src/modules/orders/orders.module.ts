import { Module } from '@nestjs/common';

import OrdersService from './orders.service';

@Module({
	exports: [OrdersService],
	providers: [OrdersService],
})
export default class OrdersModule {}
