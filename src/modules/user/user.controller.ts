import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import UserService from './user.service';

@Controller('user')
export default class UserController {
    constructor(private userService: UserService) {}

    @Get('/')
    async test() {
        return this.userService.test();
    }
}
