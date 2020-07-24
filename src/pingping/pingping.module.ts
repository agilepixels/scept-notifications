import { Module, HttpModule } from '@nestjs/common';
import { PingpingController } from './pingping.controller';

require('dotenv').config();

@Module({
	imports: [
		HttpModule.register({
			baseURL: 'https://pingping.io/webapi',
			headers: {
				Authorization: `Bearer: ${process.env.PINGPING_API_TOKEN}`,
			}
		})
	],
  controllers: [PingpingController],
})
export class PingpingModule {}
