import { Controller, Post } from '@nestjs/common';
import HealthcheckService from './healthcheck.service';

@Controller('healthcheck')
export default class HealthcheckController {
	constructor(private healthcheckService: HealthcheckService) {}

	@Post('/')
	async healthcheck() {
		return this.healthcheckService.healthcheck();
	}
}
