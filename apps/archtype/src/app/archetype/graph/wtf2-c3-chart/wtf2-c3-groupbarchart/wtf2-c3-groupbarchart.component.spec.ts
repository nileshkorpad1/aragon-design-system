import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2C3GroupbarchartComponent } from './wtf2-c3-groupbarchart.component';

describe('Wtf2C3GroupbarchartComponent', () => {
  let component: Wtf2C3GroupbarchartComponent;
  let fixture: ComponentFixture<Wtf2C3GroupbarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2C3GroupbarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2C3GroupbarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
