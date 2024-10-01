import { Injectable } from '@nestjs/common';
import PostgresService from '../postgres/postgres.service';

@Injectable()
export default class UserService {
    constructor(
        // private logger: CustomLogger,
        private pgService: PostgresService,
    ) {}

    async test() {
        const test = await this.pgService.query('SELECT 1 FROM test LIMIT 1;');
        return test;
    }
}
