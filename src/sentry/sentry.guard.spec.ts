import { SentryGuard } from './sentry.guard';

describe('SentryGuard', () => {
  it('should be defined', () => {
    expect(new SentryGuard()).toBeDefined();
  });
});
