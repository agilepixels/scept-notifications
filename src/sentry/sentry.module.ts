import { Module } from '@nestjs/common';
import { SentryService } from './sentry.service';
import { SentryController } from './sentry.controller';
import { SlackModule } from '../slack/slack.module';

@Module({
	imports: [SlackModule],
  providers: [SentryService],
  controllers: [SentryController]
})
export class SentryModule {}
