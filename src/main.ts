import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

const dotenv = require('dotenv');

async function bootstrap() {
	dotenv.config();
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.use(helmet());
	app.set('trust proxy', 1);
  await app.listen(3000);
}
bootstrap();
