import { BootstrapLayoutDemoModule } from './bootstrap-layout-demo.module';

describe('BootstrapLayoutDemoModule', () => {
  let bootstrapLayoutDemoModule: BootstrapLayoutDemoModule;

  beforeEach(() => {
    bootstrapLayoutDemoModule = new BootstrapLayoutDemoModule();
  });

  it('should create an instance', () => {
    expect(bootstrapLayoutDemoModule).toBeTruthy();
  });
});
