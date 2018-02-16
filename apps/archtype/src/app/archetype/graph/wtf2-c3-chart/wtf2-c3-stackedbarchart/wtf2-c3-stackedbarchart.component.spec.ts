import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2C3StackedbarchartComponent } from './wtf2-c3-stackedbarchart.component';

describe('Wtf2C3StackedbarchartComponent', () => {
  let component: Wtf2C3StackedbarchartComponent;
  let fixture: ComponentFixture<Wtf2C3StackedbarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2C3StackedbarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2C3StackedbarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
