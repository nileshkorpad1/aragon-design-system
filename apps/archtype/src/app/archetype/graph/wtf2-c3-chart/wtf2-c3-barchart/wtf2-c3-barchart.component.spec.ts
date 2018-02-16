import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2C3BarchartComponent } from './wtf2-c3-barchart.component';

describe('Wtf2C3BarchartComponent', () => {
  let component: Wtf2C3BarchartComponent;
  let fixture: ComponentFixture<Wtf2C3BarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2C3BarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2C3BarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
