import { CurrencyFormatModule } from './currency-format.module';

describe('CurrencyFormatModule', () => {
  let currencyFormatModule: CurrencyFormatModule;

  beforeEach(() => {
    currencyFormatModule = new CurrencyFormatModule();
  });

  it('should create an instance', () => {
    expect(currencyFormatModule).toBeTruthy();
  });
});
