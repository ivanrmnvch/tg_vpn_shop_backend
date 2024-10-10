import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import UserService from './user.service';

import UserDto from '../../common/dto/user.dto';

@Controller('user')
export default class UserController {
	constructor(private userService: UserService) {}

	@Get('/:id/meta')
	async getUserMeta(@Param('id') id: number) {
		return this.userService.getUserMeta(id);
	}

	@Post('/')
	async addUser(@Body() body: UserDto) {
		return this.userService.addUser(body);
	}

	@Post('/:id/check')
	async checkUser(@Param('id') id: number): Promise<boolean> {
		return this.userService.checkUser(id);
	}

	@Post('/:id/trial')
	async getTrial(@Param('id') id: number) {
		return this.userService.getTrial(id);
	}
}
