import { PagelayoutCardedModule } from './pagelayout-carded.module';

describe('PagelayoutCardedModule', () => {
  let pagelayoutCardedModule: PagelayoutCardedModule;

  beforeEach(() => {
    pagelayoutCardedModule = new PagelayoutCardedModule();
  });

  it('should create an instance', () => {
    expect(pagelayoutCardedModule).toBeTruthy();
  });
});
