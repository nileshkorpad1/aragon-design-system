import { FormfieldModule } from './formfield.module';

describe('FormfieldModule', () => {
  let FormfieldModule: FormfieldModule;

  beforeEach(() => {
    FormfieldModule = new FormfieldModule();
  });

  it('should create an instance', () => {
    expect(FormfieldModule).toBeTruthy();
  });
});
