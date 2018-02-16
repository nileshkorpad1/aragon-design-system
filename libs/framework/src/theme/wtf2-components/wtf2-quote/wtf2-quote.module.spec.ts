import { Wtf2QuoteModule } from './wtf2-quote.module';

describe('Wtf2QuoteModule', () => {
  let wtf2QuoteModule: Wtf2QuoteModule;

  beforeEach(() => {
    wtf2QuoteModule = new Wtf2QuoteModule();
  });

  it('should create an instance', () => {
    expect(wtf2QuoteModule).toBeTruthy();
  });
});
