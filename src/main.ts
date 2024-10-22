import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// todo вынести try catch в глобальный фильтр исключений

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn'],
	});
	app.setGlobalPrefix('api');
	await app.listen(+process.env.TVS_B_PORT || 8082);
}
bootstrap();
