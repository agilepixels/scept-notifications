import { Controller, UseGuards, Post, Body, Req, UnprocessableEntityException } from '@nestjs/common';
import { SentryGuard } from './sentry.guard';
import { SentryService } from './sentry.service';
import { Request } from 'express';

@Controller('sentry')
export class SentryController {
	constructor(
		private readonly sentryService: SentryService,
	) {}

	@UseGuards(SentryGuard)
	@Post()
	async handleWebhook(@Req() request: Request, @Body() body: any) {
		this.sentryService.handleWebhook(request, body);
	}

	@Post('slack')
	async handleSlackWebhook(@Req() request: Request, @Body() body: any) {
		if (body.payload) {
			const { user, actions, response_url, message } = JSON.parse(body.payload);
			if (actions.length === 1 && (['ignoreIssue', 'resolveIssue'].includes(actions[0].action_id)) && actions[0].value) {
				const type = actions[0].action_id === 'ignoreIssue' ? 'ignored' : 'resolved';
				this.sentryService.updateIssue(actions[0].value, user, message, response_url, type)
			}
		} else {
			throw new UnprocessableEntityException()
		}
	}
}
