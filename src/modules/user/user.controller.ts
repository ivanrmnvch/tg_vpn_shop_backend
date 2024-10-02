import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import UserService from './user.service';

import UserDto from './dto/user.dto';

@Controller('user')
export default class UserController {
	constructor(private userService: UserService) {}

	@Get('/meta')
	async getUserMeta(@Query('id') id: number) {
		return this.userService.getUserMeta(id);
	}

	@Post('/')
	async addUser(@Body() body: UserDto) {
		return this.userService.addUser(body);
	}

	@Post('/check')
	async checkUser(@Query('id') id: number): Promise<boolean> {
		return this.userService.checkUser(id);
	}
}
