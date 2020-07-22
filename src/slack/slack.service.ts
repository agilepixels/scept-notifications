import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class SlackService {
	constructor(
		private readonly httpService: HttpService,
	) {}

	async sendMessage(message: any) {
		await this.httpService.post('', message).toPromise()
	}
}
