import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableGridComponent } from './draggable-grid.component';

describe('DraggableGridComponent', () => {
  let component: DraggableGridComponent;
  let fixture: ComponentFixture<DraggableGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraggableGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
