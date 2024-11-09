import { Injectable, StreamableFile } from '@nestjs/common';
import PostgresService from '../postgres/postgres.service';

import IServerData from './interfaces/IServerData';
import IVPNClientId from './interfaces/IVPNClientId';

import { getUrl } from './utils/getUrl';

import { PassThrough } from 'stream';
import * as QRCode from 'qrcode';

@Injectable()
export default class QrCodeService {
	constructor(
		// private logger: CustomLogger,
		private pgService: PostgresService
	) {}

	async getVPNClientId(tgId: number) {
		const [{ clientId }] = await this.pgService.query<IVPNClientId>(
			'SELECT client_id as "clientId" FROM tg_users_meta WHERE id = $1::bigint;',
			[tgId]
		);
		return clientId;
	}

	async getQRKey(id: number, code: string) {
		const clientId = await this.getVPNClientId(id);

		const [{ ip, country, sni, pbk, sid }] =
			await this.pgService.query<IServerData>(
				`
					SELECT ip, country, sni, pbk, sid
					FROM servers WHERE name = $1::varchar;
				`,
				[code]
			);

		const url = getUrl({ clientId, ip, sni, pbk, sid, country });
		const readable = new PassThrough();

		await QRCode.toFileStream(readable, url);

		return new StreamableFile(readable);
	}
}
