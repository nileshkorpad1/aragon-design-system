import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2C3HorizontalbarchartComponent } from './wtf2-c3-horizontalbarchart.component';

describe('Wtf2C3HorizontalbarchartComponent', () => {
  let component: Wtf2C3HorizontalbarchartComponent;
  let fixture: ComponentFixture<Wtf2C3HorizontalbarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2C3HorizontalbarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2C3HorizontalbarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
