import { ElevationDemoModule } from './elevation-demo.module';

describe('ElevationDemoModule', () => {
  let elevationDemoModule: ElevationDemoModule;

  beforeEach(() => {
    elevationDemoModule = new ElevationDemoModule();
  });

  it('should create an instance', () => {
    expect(elevationDemoModule).toBeTruthy();
  });
});
