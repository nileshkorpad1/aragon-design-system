import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2GaugeChartComponent } from './wtf2-gauge-chart.component';

describe('Wtf2GaugeChartComponent', () => {
  let component: Wtf2GaugeChartComponent;
  let fixture: ComponentFixture<Wtf2GaugeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2GaugeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2GaugeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
