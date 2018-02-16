import { FileUploadDemoModule } from './file-upload-demo.module';

describe('FileUploadDemoModule', () => {
  let fileUploadDemoModule: FileUploadDemoModule;

  beforeEach(() => {
    fileUploadDemoModule = new FileUploadDemoModule();
  });

  it('should create an instance', () => {
    expect(fileUploadDemoModule).toBeTruthy();
  });
});
