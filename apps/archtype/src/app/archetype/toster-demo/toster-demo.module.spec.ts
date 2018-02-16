import { TosterDemoModule } from './toster-demo.module';

describe('TosterDemoModule', () => {
  let tosterDemoModule: TosterDemoModule;

  beforeEach(() => {
    tosterDemoModule = new TosterDemoModule();
  });

  it('should create an instance', () => {
    expect(tosterDemoModule).toBeTruthy();
  });
});
