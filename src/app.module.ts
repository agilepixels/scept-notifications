import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SentryModule } from './sentry/sentry.module';
import { PingpingModule } from './pingping/pingping.module';
import { SlackModule } from './slack/slack.module';

@Module({
  imports: [SentryModule, PingpingModule, SlackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
