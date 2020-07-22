import { Test, TestingModule } from '@nestjs/testing';
import { SentryController } from './sentry.controller';

describe('Sentry Controller', () => {
  let controller: SentryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SentryController],
    }).compile();

    controller = module.get<SentryController>(SentryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
