import { InformExpanderDemoModule } from './inform-expander-demo.module';

describe('InformExpanderDemoModule', () => {
  let informExpanderDemoModule: InformExpanderDemoModule;

  beforeEach(() => {
    informExpanderDemoModule = new InformExpanderDemoModule();
  });

  it('should create an instance', () => {
    expect(informExpanderDemoModule).toBeTruthy();
  });
});
