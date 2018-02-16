import { PagelayoutSimpleFullwidthModule } from './pagelayout-simple-fullwidth.module';

describe('PagelayoutSimpleFullwidthModule', () => {
  let pagelayoutSimpleFullwidthModule: PagelayoutSimpleFullwidthModule;

  beforeEach(() => {
    pagelayoutSimpleFullwidthModule = new PagelayoutSimpleFullwidthModule();
  });

  it('should create an instance', () => {
    expect(pagelayoutSimpleFullwidthModule).toBeTruthy();
  });
});
