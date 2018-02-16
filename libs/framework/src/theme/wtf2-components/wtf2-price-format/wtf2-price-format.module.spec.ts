import { Wtf2PriceFormatModule } from './wtf2-price-format.module';

describe('Wtf2PriceFormatModule', () => {
  let wtf2PriceFormatModule: Wtf2PriceFormatModule;

  beforeEach(() => {
    wtf2PriceFormatModule = new Wtf2PriceFormatModule();
  });

  it('should create an instance', () => {
    expect(wtf2PriceFormatModule).toBeTruthy();
  });
});
