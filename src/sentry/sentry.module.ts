import { Module, HttpModule } from '@nestjs/common';
import { SentryService } from './sentry.service';
import { SentryController } from './sentry.controller';
import { SlackModule } from '../slack/slack.module';

require('dotenv').config()

@Module({
	imports: [
		SlackModule,
		HttpModule.register({
			headers: {
				Authorization: `Bearer ${process.env.SENTRY_API_TOKEN}`,
			}
		})
	],
  providers: [SentryService],
  controllers: [SentryController]
})
export class SentryModule {}
