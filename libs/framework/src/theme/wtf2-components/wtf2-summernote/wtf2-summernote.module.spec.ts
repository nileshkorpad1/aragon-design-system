import { Wtf2SummernoteModule } from './wtf2-summernote.module';

describe('Wtf2SummernoteModule', () => {
  let wtf2SummernoteModule: Wtf2SummernoteModule;

  beforeEach(() => {
    wtf2SummernoteModule = new Wtf2SummernoteModule();
  });

  it('should create an instance', () => {
    expect(wtf2SummernoteModule).toBeTruthy();
  });
});
