import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';

import { ConfigModule } from '@nestjs/config';

import PostgresModule from "./modules/postgres/postgres.module";

import pgConfig from './config/pg.config';

import UserModule from './modules/user/user.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: join(__dirname, '../.env'),
      }),
      PostgresModule.forRoot(pgConfig()),

      UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
