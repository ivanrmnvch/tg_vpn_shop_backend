import { Controller, Get, Query, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import VpnServicesService from './vpn_services.service';

@Controller('vpn-services')
export default class VpnServicesController {
	constructor(private vpnServicesService: VpnServicesService) {}

	@Get('/')
	async getQRKey(
		@Query('id') id: number,
		@Query('code') code: string,
		@Res({ passthrough: true }) res: Response
	): Promise<StreamableFile> {
		// todo вынести try catch в глобальный фильтр исключений
		try {
			res.setHeader('Content-Type', 'image/png');
			return this.vpnServicesService.getQRKey(id, code);
		} catch {
			res.status(500).send('Failed to generate QR code');
		}
	}
}
