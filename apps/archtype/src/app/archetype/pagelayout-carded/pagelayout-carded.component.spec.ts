import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagelayoutCardedComponent } from './pagelayout-carded.component';

describe('PagelayoutCardedComponent', () => {
  let component: PagelayoutCardedComponent;
  let fixture: ComponentFixture<PagelayoutCardedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagelayoutCardedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagelayoutCardedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
