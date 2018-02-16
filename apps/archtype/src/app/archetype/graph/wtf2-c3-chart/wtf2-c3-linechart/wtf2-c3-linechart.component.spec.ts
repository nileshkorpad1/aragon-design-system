import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2C3LinechartComponent } from './wtf2-c3-linechart.component';

describe('Wtf2C3LinechartComponent', () => {
  let component: Wtf2C3LinechartComponent;
  let fixture: ComponentFixture<Wtf2C3LinechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2C3LinechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2C3LinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
