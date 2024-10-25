import { Module } from '@nestjs/common';

import VpnClientsService from './vpn_clients.service';
import KafkaService from '../kafka/kafka.service';

@Module({
	exports: [VpnClientsService],
	providers: [VpnClientsService, KafkaService],
})
export default class VpnClientsModule {}
