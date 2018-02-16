import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2C3DonutchartComponent } from './wtf2-c3-donutchart.component';

describe('Wtf2C3DonutchartComponent', () => {
  let component: Wtf2C3DonutchartComponent;
  let fixture: ComponentFixture<Wtf2C3DonutchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2C3DonutchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2C3DonutchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
