import { Test, TestingModule } from '@nestjs/testing';
import { PingpingService } from './pingping.service';

describe('PingpingService', () => {
  let service: PingpingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PingpingService],
    }).compile();

    service = module.get<PingpingService>(PingpingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
