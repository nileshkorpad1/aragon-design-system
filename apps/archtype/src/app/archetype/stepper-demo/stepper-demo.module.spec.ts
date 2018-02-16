import { StepperDemoModule } from './stepper-demo.module';

describe('StepperDemoModule', () => {
  let stepperDemoModule: StepperDemoModule;

  beforeEach(() => {
    stepperDemoModule = new StepperDemoModule();
  });

  it('should create an instance', () => {
    expect(stepperDemoModule).toBeTruthy();
  });
});
