import { SpinnerDemoModule } from './spinner-demo.module';

describe('SpinnerDemoModule', () => {
  let spinnerDemoModule: SpinnerDemoModule;

  beforeEach(() => {
    spinnerDemoModule = new SpinnerDemoModule();
  });

  it('should create an instance', () => {
    expect(spinnerDemoModule).toBeTruthy();
  });
});
