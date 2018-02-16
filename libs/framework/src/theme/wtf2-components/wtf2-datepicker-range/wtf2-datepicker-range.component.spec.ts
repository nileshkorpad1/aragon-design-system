import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2DatepickerRangeComponent } from './wtf2-datepicker-range.component';

describe('Wtf2DatepickerRangeComponent', () => {
  let component: Wtf2DatepickerRangeComponent;
  let fixture: ComponentFixture<Wtf2DatepickerRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2DatepickerRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2DatepickerRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
