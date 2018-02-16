import { PagelayoutRightSidenavSimpleModule } from './pagelayout-right-sidenav-simple.module';

describe('PagelayoutRightSidenavSimpleModule', () => {
  let pagelayoutRightSidenavSimpleModule: PagelayoutRightSidenavSimpleModule;

  beforeEach(() => {
    pagelayoutRightSidenavSimpleModule = new PagelayoutRightSidenavSimpleModule();
  });

  it('should create an instance', () => {
    expect(pagelayoutRightSidenavSimpleModule).toBeTruthy();
  });
});
