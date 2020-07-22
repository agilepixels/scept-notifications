import { Module } from '@nestjs/common';
import { PingpingController } from './pingping.controller';
import { PingpingService } from './pingping.service';

@Module({
  controllers: [PingpingController],
  providers: [PingpingService]
})
export class PingpingModule {}
