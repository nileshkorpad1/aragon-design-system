import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagelayoutLeftSidenavSimpleComponent } from './pagelayout-left-sidenav-simple.component';

describe('PagelayoutLeftSidenavSimpleComponent', () => {
  let component: PagelayoutLeftSidenavSimpleComponent;
  let fixture: ComponentFixture<PagelayoutLeftSidenavSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagelayoutLeftSidenavSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagelayoutLeftSidenavSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
