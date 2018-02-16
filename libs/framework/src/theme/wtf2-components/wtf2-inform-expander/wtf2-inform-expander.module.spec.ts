import { Wtf2InformExpanderModule } from './wtf2-inform-expander.module';

describe('Wtf2InformExpanderModule', () => {
  let wtf2InformExpanderModule: Wtf2InformExpanderModule;

  beforeEach(() => {
    wtf2InformExpanderModule = new Wtf2InformExpanderModule();
  });

  it('should create an instance', () => {
    expect(wtf2InformExpanderModule).toBeTruthy();
  });
});
