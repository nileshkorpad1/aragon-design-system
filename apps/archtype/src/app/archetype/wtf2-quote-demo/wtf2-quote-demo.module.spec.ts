import { Wtf2QuoteDemoModule } from './wtf2-quote-demo.module';

describe('Wtf2QuoteDemoModule', () => {
  let wtf2QuoteDemoModule: Wtf2QuoteDemoModule;

  beforeEach(() => {
    wtf2QuoteDemoModule = new Wtf2QuoteDemoModule();
  });

  it('should create an instance', () => {
    expect(wtf2QuoteDemoModule).toBeTruthy();
  });
});
