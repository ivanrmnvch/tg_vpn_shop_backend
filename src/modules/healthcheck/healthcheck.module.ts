import { Module } from '@nestjs/common';

import HealthcheckService from './healthcheck.service';
import HealthcheckController from './healthcheck.controller';

@Module({
	controllers: [HealthcheckController],
	exports: [HealthcheckService],
	providers: [HealthcheckService],
})
export default class HealthcheckModule {}
