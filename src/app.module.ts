import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';

import { ConfigModule } from '@nestjs/config';

import PostgresModule from './modules/postgres/postgres.module';

import pgConfig from './config/pg.config';

import UserModule from './modules/user/user.module';
import PaymentsModule from './modules/payments/payments.module';
import VpnServicesModule from './modules/vpn_services/vpn_services.module';
import ServersModule from './modules/servers/servers.module';
import HealthcheckModule from './modules/healthcheck/healthcheck.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: join(__dirname, '../.env'),
		}),
		PostgresModule.forRoot(pgConfig()),

		UserModule,
		PaymentsModule,
		VpnServicesModule,
		ServersModule,
		HealthcheckModule,
	],
	providers: [AppService],
})
export class AppModule {}
