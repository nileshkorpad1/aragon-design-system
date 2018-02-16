import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagelayoutCardedFullwidthInnerscollComponent } from './pagelayout-carded-fullwidth-innerscoll.component';

describe('PagelayoutCardedFullwidthInnerscollComponent', () => {
  let component: PagelayoutCardedFullwidthInnerscollComponent;
  let fixture: ComponentFixture<PagelayoutCardedFullwidthInnerscollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagelayoutCardedFullwidthInnerscollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagelayoutCardedFullwidthInnerscollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
