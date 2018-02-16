import { FormInExpandAndDialogModule } from './form-in-expand-and-dialog.module';

describe('FormInExpandAndDialogModule', () => {
  let formInExpandAndDialogModule: FormInExpandAndDialogModule;

  beforeEach(() => {
    formInExpandAndDialogModule = new FormInExpandAndDialogModule();
  });

  it('should create an instance', () => {
    expect(formInExpandAndDialogModule).toBeTruthy();
  });
});
