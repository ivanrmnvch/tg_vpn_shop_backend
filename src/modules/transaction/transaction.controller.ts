import { Body, Controller, Post } from '@nestjs/common';
import TransactionService from './transaction.service';

import TransactionDto from './dto/transaction.dto';

@Controller('transaction')
export default class TransactionController {
	constructor(private transactionService: TransactionService ) {}

	@Post('/')
	async addTransaction(@Body() body: TransactionDto) {
		console.log(">>> body", body)
		return this.transactionService.addTransaction(body);
	}
}
