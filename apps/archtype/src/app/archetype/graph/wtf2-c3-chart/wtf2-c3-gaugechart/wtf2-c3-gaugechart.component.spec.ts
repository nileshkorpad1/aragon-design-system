import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2C3GaugechartComponent } from './wtf2-c3-gaugechart.component';

describe('Wtf2C3GaugechartComponent', () => {
  let component: Wtf2C3GaugechartComponent;
  let fixture: ComponentFixture<Wtf2C3GaugechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2C3GaugechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2C3GaugechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
