import { Module } from '@nestjs/common';

import QrCodeService from './qrCode.service';
import QrCodeController from './qrCode.controller';

@Module({
	controllers: [QrCodeController],
	exports: [QrCodeService],
	providers: [QrCodeService],
})
export default class QrCodeModule {}
