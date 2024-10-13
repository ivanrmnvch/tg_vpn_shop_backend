import { Controller, Get, Query } from '@nestjs/common';
import ServersService from './servers.service';
import ServersDto from './dto/servers.dto';

@Controller('servers')
export default class ServersController {
	constructor(private serversService: ServersService) {}

	@Get('/')
	async getServers(@Query() query: ServersDto) {
		return this.serversService.getServers(query);
	}
}
