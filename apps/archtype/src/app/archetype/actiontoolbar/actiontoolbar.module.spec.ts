import { ActiontoolbarModule } from './actiontoolbar.module';

describe('ActiontoolbarModule', () => {
  let ActiontoolbarModule: ActiontoolbarModule;

  beforeEach(() => {
    ActiontoolbarModule = new ActiontoolbarModule();
  });

  it('should create an instance', () => {
    expect(ActiontoolbarModule).toBeTruthy();
  });
});
