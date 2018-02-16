import { Wtf2PasswordStrengthModule } from './wtf2-password-strength.module';

describe('Wtf2PasswordStrengthModule', () => {
  let wtf2PasswordStrengthModule: Wtf2PasswordStrengthModule;

  beforeEach(() => {
    wtf2PasswordStrengthModule = new Wtf2PasswordStrengthModule();
  });

  it('should create an instance', () => {
    expect(wtf2PasswordStrengthModule).toBeTruthy();
  });
});
