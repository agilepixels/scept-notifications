import { Controller, UseGuards, Post, Body, Req } from '@nestjs/common';
import { SentryGuard } from './sentry.guard';
import { SentryService } from './sentry.service';
import { Request } from 'express';

@UseGuards(SentryGuard)
@Controller('sentry')
export class SentryController {
	constructor(
		private readonly sentryService: SentryService,
	) {}

	@Post()
	async handleWebhook(@Req() request: Request, @Body() body: any) {
		this.sentryService.handleWebhook(request, body);
	}
}
