import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2C3ChartComponent } from './wtf2-c3-chart.component';

describe('Wtf2C3ChartComponent', () => {
  let component: Wtf2C3ChartComponent;
  let fixture: ComponentFixture<Wtf2C3ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2C3ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2C3ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
