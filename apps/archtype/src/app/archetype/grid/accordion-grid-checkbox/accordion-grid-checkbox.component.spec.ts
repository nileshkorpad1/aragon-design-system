import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionGridCheckboxComponent } from './accordion-grid-checkbox.component';

describe('AccordionGridCheckboxComponent', () => {
  let component: AccordionGridCheckboxComponent;
  let fixture: ComponentFixture<AccordionGridCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionGridCheckboxComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionGridCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
