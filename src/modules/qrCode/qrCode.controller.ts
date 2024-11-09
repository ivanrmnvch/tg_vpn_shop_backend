import { Controller, Get, Query, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import QrCodeService from './qrCode.service';

@Controller('vpn-services')
export default class QrCodeController {
	constructor(private qrCodeService: QrCodeService) {}

	@Get('/')
	async getQRKey(
		@Query('id') id: number,
		@Query('code') code: string,
		@Res({ passthrough: true }) res: Response
	): Promise<StreamableFile> {
		// todo вынести try catch в глобальный фильтр исключений
		try {
			res.setHeader('Content-Type', 'image/png');
			return this.qrCodeService.getQRKey(id, code);
		} catch {
			res.status(500).send('Failed to generate QR code');
		}
	}
}
