import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagelayoutLeftSidenavCardedComponent } from './pagelayout-left-sidenav-carded.component';

describe('PagelayoutLeftSidenavCardedComponent', () => {
  let component: PagelayoutLeftSidenavCardedComponent;
  let fixture: ComponentFixture<PagelayoutLeftSidenavCardedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagelayoutLeftSidenavCardedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagelayoutLeftSidenavCardedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
