import { WYSIWYGLayoutModule } from './wysiwyg-layout.module';

describe('WYSIWYGLayoutModule', () => {
  let wYSIWYGLayoutModule: WYSIWYGLayoutModule;

  beforeEach(() => {
    wYSIWYGLayoutModule = new WYSIWYGLayoutModule();
  });

  it('should create an instance', () => {
    expect(wYSIWYGLayoutModule).toBeTruthy();
  });
});
