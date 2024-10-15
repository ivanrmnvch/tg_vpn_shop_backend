import { Body, Controller, Post } from '@nestjs/common';
import PaymentsService from './payments.service';

import PaymentsDto from './dto/payments.dto';

@Controller('payments')
export default class PaymentsController {
	constructor(private paymentsService: PaymentsService) {}

	@Post('/')
	async savePayment(@Body() body: PaymentsDto) {
		return this.paymentsService.savePayment(body);
	}
}
