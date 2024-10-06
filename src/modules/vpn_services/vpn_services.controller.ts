import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import Vpn_servicesService from './vpn_services.service';

import UserDto from './dto/user.dto';

@Controller('vpn-services')
export default class VpnServicesController {
	constructor(private userService: Vpn_servicesService) {}

	@Post('/')
	async addUser(@Body() body: UserDto) {
		return this.userService.addUser(body);
	}
}
