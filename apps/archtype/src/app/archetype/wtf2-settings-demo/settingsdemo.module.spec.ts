import { SettingsdemoModule } from './settingsdemo.module';

describe('SettingsdemoModule', () => {
  let settingsdemoModule: SettingsdemoModule;

  beforeEach(() => {
    settingsdemoModule = new SettingsdemoModule();
  });

  it('should create an instance', () => {
    expect(settingsdemoModule).toBeTruthy();
  });
});
