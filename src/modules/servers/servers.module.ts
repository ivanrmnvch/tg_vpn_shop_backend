import { Module } from '@nestjs/common';

import ServersService from './servers.service';
import ServersController from './servers.controller';

@Module({
	controllers: [ServersController],
	exports: [ServersService],
	providers: [ServersService],
})
export default class ServersModule {}
