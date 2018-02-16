import { Wtf2GaugeChartModule } from './wtf2-gauge-chart.module';

describe('Wtf2GaugeChartModule', () => {
  let wtf2GaugeChartModule: Wtf2GaugeChartModule;

  beforeEach(() => {
    wtf2GaugeChartModule = new Wtf2GaugeChartModule();
  });

  it('should create an instance', () => {
    expect(wtf2GaugeChartModule).toBeTruthy();
  });
});
