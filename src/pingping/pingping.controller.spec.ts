import { Test, TestingModule } from '@nestjs/testing';
import { PingpingController } from './pingping.controller';

describe('Pingping Controller', () => {
  let controller: PingpingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PingpingController],
    }).compile();

    controller = module.get<PingpingController>(PingpingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
