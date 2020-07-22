import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { SlackService } from '../slack/slack.service';

@Injectable()
export class SentryService {
	constructor(
		private readonly slackService: SlackService,
	) {}

	async handleWebhook(request: Request, body: any) {
		const resource = request.get("sentry-hook-resource");
		const { action } = body;
		
		if (resource === "issue" && action === "created") {
			const {id, permalink, metadata: { type, value } } = body.data.issue;
			await this.slackService.sendMessage({
				username: 'Sentry',
				text: type,
				icon_emoji: ':zap:',
				blocks: [
					{
						type: "section",
						text: {
							type: "mrkdwn",
							text: `<${permalink}|*${type}*> \n ${value}`
						}
					},
					{
						type: "actions",
						elements: [
							{
								type: "button",
								text: {
									type: "plain_text",
									text: "Ignore",
									emoji: true
								},
								value: "Ignore"
							}
						]
					}
				]
			})
		}
	
	}
}
