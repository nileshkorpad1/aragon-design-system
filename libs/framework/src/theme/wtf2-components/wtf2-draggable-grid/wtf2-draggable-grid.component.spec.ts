import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2DraggableGridComponent } from './wtf2-draggable-grid.component';

describe('Wtf2DraggableGridComponent', () => {
  let component: Wtf2DraggableGridComponent;
  let fixture: ComponentFixture<Wtf2DraggableGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2DraggableGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2DraggableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
