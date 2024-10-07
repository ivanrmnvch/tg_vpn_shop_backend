import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import VpnServicesService from './vpn_services.service';

import UserDto from '../../common/dto/user.dto';

@Controller('vpn-services')
export default class VpnServicesController {
	constructor(private vpnServicesService: VpnServicesService ) {}

	@Post('/')
	async addUser(@Body() body: UserDto) {
		return this.vpnServicesService.addUser(body);
	}
}
