import { Wtf2InlineEditorModule } from './wtf2-inline-editor.module';

describe('Wtf2InlineEditorModule', () => {
  let wtf2InlineEditorModule: Wtf2InlineEditorModule;

  beforeEach(() => {
    wtf2InlineEditorModule = new Wtf2InlineEditorModule();
  });

  it('should create an instance', () => {
    expect(wtf2InlineEditorModule).toBeTruthy();
  });
});
