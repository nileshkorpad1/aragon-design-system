import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagelayoutCardedFullwidthComponent } from './pagelayout-carded-fullwidth.component';

describe('PagelayoutCardedFullwidthComponent', () => {
  let component: PagelayoutCardedFullwidthComponent;
  let fixture: ComponentFixture<PagelayoutCardedFullwidthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagelayoutCardedFullwidthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagelayoutCardedFullwidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
