import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagelayoutSimpleFullwidthComponent } from './pagelayout-simple-fullwidth.component';

describe('PagelayoutSimpleFullwidthComponent', () => {
  let component: PagelayoutSimpleFullwidthComponent;
  let fixture: ComponentFixture<PagelayoutSimpleFullwidthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagelayoutSimpleFullwidthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagelayoutSimpleFullwidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
