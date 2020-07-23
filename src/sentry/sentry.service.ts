import { Injectable, HttpService } from '@nestjs/common';
import { Request } from 'express';
import { SlackService } from '../slack/slack.service';
import { IBaseSlackUser } from '../slack/interfaces/base-slack-user.interface';

@Injectable()
export class SentryService {
	constructor(
		private readonly slackService: SlackService,
		private readonly httpService: HttpService,
	) {}

	async handleWebhook(request: Request, body: any) {
		const resource = request.get("sentry-hook-resource");
		const { action } = body;

	
		if (resource === "issue" && action === "created") {
			const {id, metadata: { type, value } } = body.data.issue;
			const url = process.env.BASE_SENTRY_URL + `/${id}`
			await this.slackService.sendMessage({
				username: 'Sentry',
				text: type,
				blocks: [
					{
						type: "section",
						text: {
							type: "mrkdwn",
							text: `<${url}|*${type}*> \n ${value}`
						}
					},
					{
						type: "actions",
						elements: [
							{
								type: "button",
								text: {
									type: "plain_text",
									text: "Resolve"
								},
								value: `${id}`,
								style: 'primary',
								action_id: 'resolveIssue'
							},
							{
								type: "button",
								text: {
									type: "plain_text",
									text: "Ignore"
								},
								value: `${id}`,
								action_id: 'ignoreIssue'
							},
						]
					}
				],
			}).catch(console.log)
		}
	}

	async updateIssue(issueId: string, user: IBaseSlackUser, message: any, response_url: string, status: 'ignored' | 'resolved') {
		await this.httpService.put(`https://sentry.io/api/0/issues/${issueId}/`, { status })
			.toPromise()
			.catch(console.error)
			.then(() => {
				const response = {
					username: 'Sentry',
					text: message.text,
					blocks: [
						message.blocks[0],
						{
							type: "section",
							text: {
								type: "mrkdwn",
								text: `*${status.charAt(0).toUpperCase() + status.slice(1)}* by <@${user.username}>`
							}
						},
					],
				}
				this.httpService.post(response_url, response)
				.toPromise()
				.catch(console.error)
			})
	}
}
