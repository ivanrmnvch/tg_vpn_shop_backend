import { Body, Controller, Post } from '@nestjs/common';
import UserService from './user.service';

import UserDto from './dto/user.dto';

@Controller('user')
export default class UserController {
	constructor(private userService: UserService) {}

	@Post('/')
	async addUser(@Body() body: UserDto) {
		return this.userService.addUser(body);
	}
}
