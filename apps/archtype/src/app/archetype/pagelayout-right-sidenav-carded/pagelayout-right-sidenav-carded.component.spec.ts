import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagelayoutRightSidenavCardedComponent } from './pagelayout-right-sidenav-carded.component';

describe('PagelayoutRightSidenavCardedComponent', () => {
  let component: PagelayoutRightSidenavCardedComponent;
  let fixture: ComponentFixture<PagelayoutRightSidenavCardedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagelayoutRightSidenavCardedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagelayoutRightSidenavCardedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
