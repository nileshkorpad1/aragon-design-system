import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedGridComponent } from './nested-grid.component';

describe('NestedGridComponent', () => {
  let component: NestedGridComponent;
  let fixture: ComponentFixture<NestedGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
