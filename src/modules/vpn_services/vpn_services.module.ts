import { Module } from '@nestjs/common';

import VpnServicesService from './vpn_services.service';
import VpnServicesController from './vpn_services.controller';

@Module({
	controllers: [VpnServicesController],
	exports: [VpnServicesService],
	providers: [VpnServicesService],
})
export default class VpnServicesModule {}
