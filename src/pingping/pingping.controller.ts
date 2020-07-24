import { Controller, Post, Param, HttpService, UseGuards } from '@nestjs/common';
import { PingpingGuard } from './pingping.guard';

@UseGuards(PingpingGuard)
@Controller('pingping')
export class PingpingController {
	constructor(
		private readonly httpService: HttpService,
	) {}

	@Post(':checkId/disable')
	async disableCheck(@Param('checkId') checkId: string) {
		await this.httpService.post(`checks/${checkId}/disable`)
			.toPromise()
			.catch(console.error)
	}

	@Post(':checkId/enable')
	async enableCheck(@Param('checkId') checkId: string) {
		await this.httpService.post(`checks/${checkId}/enable`)
			.toPromise()
			.catch(console.error)
	}
}
