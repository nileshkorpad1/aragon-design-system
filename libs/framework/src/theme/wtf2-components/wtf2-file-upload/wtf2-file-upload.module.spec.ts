import { Wtf2FileUploadModule } from './wtf2-file-upload.module';

describe('Wtf2FileUploadModule', () => {
  let wtf2FileUploadModule: Wtf2FileUploadModule;

  beforeEach(() => {
    wtf2FileUploadModule = new Wtf2FileUploadModule();
  });

  it('should create an instance', () => {
    expect(wtf2FileUploadModule).toBeTruthy();
  });
});
