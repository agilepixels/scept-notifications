import { Module, HttpModule } from '@nestjs/common';
import { SlackService } from './slack.service';

require('dotenv').config();

@Module({
	imports: [
		HttpModule.register({
			baseURL: process.env.SLACK_WEBHOOK,
			headers: {
				'User-Agent': `scept-notifications`,
			},
		}),
	],
	providers: [SlackService],
	exports: [SlackService],
})
export class SlackModule {}
