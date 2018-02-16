import { BadgesAndChipsModule } from './badges-and-chips.module';

describe('BadgesAndChipsModule', () => {
  let badgesAndChipsModule: BadgesAndChipsModule;

  beforeEach(() => {
    badgesAndChipsModule = new BadgesAndChipsModule();
  });

  it('should create an instance', () => {
    expect(badgesAndChipsModule).toBeTruthy();
  });
});
