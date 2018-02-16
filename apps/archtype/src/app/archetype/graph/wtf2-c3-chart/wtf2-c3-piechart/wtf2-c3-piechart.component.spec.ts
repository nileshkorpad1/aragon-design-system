import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2C3PiechartComponent } from './wtf2-c3-piechart.component';

describe('Wtf2C3PiechartComponent', () => {
  let component: Wtf2C3PiechartComponent;
  let fixture: ComponentFixture<Wtf2C3PiechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2C3PiechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2C3PiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
