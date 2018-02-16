import { ProgressbarModule } from './progressbar.module';

describe('ProgressbarModule', () => {
  let progressbarModule: ProgressbarModule;

  beforeEach(() => {
    progressbarModule = new ProgressbarModule();
  });

  it('should create an instance', () => {
    expect(progressbarModule).toBeTruthy();
  });
});
