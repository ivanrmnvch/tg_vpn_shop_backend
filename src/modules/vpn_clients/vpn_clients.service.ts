import { Injectable } from '@nestjs/common';
import PostgresService from '../postgres/postgres.service';
import KafkaService from '../kafka/kafka.service';
import VpnClient from './interfaces/vpnClient';

@Injectable()
export default class VpnClientsService {
	constructor(
		// private logger: CustomLogger,
		private kafka: KafkaService,
		private pgService: PostgresService
	) {}

	async getClient(tgId: number) {
		const [client] = await this.pgService.query<VpnClient>(
			`
				SELECT vc.id, vc.login FROM tg_users_meta as meta
					JOIN vpn_clients as vc ON vc.id = meta.vpn_client_id
				WHERE meta.id = $1::bigint AND vc.active IS TRUE;
			`,
			[tgId]
		);
		return client;
	}

	async addClient(tgId: number) {
		return this.pgService.query<VpnClient>(
			'INSERT INTO vpn_clients DEFAULT VALUES RETURNING id, login;'
		);
	}

	async updateServerConfig(tgId: number) {
		let client: VpnClient;
		client = await this.getClient(tgId);
	}
}
