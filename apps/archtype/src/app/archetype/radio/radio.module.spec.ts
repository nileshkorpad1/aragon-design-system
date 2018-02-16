import { RadioModule } from './radio.module';

describe('RadioModule', () => {
  let RadioModule: RadioModule;

  beforeEach(() => {
    RadioModule = new RadioModule();
  });

  it('should create an instance', () => {
    expect(RadioModule).toBeTruthy();
  });
});
