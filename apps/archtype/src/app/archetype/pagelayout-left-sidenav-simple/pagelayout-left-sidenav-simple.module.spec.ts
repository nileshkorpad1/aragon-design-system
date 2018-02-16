import { PagelayoutLeftSidenavSimpleModule } from './pagelayout-left-sidenav-simple.module';

describe('PagelayoutLeftSidenavSimpleModule', () => {
  let pagelayoutLeftSidenavSimpleModule: PagelayoutLeftSidenavSimpleModule;

  beforeEach(() => {
    pagelayoutLeftSidenavSimpleModule = new PagelayoutLeftSidenavSimpleModule();
  });

  it('should create an instance', () => {
    expect(pagelayoutLeftSidenavSimpleModule).toBeTruthy();
  });
});
