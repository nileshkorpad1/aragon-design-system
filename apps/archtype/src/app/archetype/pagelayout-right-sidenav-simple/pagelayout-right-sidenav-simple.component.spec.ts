import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagelayoutRightSidenavSimpleComponent } from './pagelayout-right-sidenav-simple.component';

describe('PagelayoutRightSidenavSimpleComponent', () => {
  let component: PagelayoutRightSidenavSimpleComponent;
  let fixture: ComponentFixture<PagelayoutRightSidenavSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagelayoutRightSidenavSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagelayoutRightSidenavSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
