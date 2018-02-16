import { DashboardOneModule } from './dashboard-one.module';

describe('DashboardOneModule', () => {
  let dashboardOneModule: DashboardOneModule;

  beforeEach(() => {
    dashboardOneModule = new DashboardOneModule();
  });

  it('should create an instance', () => {
    expect(dashboardOneModule).toBeTruthy();
  });
});
