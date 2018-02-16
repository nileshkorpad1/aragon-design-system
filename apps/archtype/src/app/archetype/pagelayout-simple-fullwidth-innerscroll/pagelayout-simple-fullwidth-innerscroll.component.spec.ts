import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagelayoutSimpleFullwidthInnerscrollComponent } from './pagelayout-simple-fullwidth-innerscroll.component';

describe('PagelayoutSimpleFullwidthInnerscrollComponent', () => {
  let component: PagelayoutSimpleFullwidthInnerscrollComponent;
  let fixture: ComponentFixture<PagelayoutSimpleFullwidthInnerscrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagelayoutSimpleFullwidthInnerscrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagelayoutSimpleFullwidthInnerscrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
