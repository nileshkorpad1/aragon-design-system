import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInExpandAndDialogComponent } from './form-in-expand-and-dialog.component';

describe('FormInExpandAndDialogComponent', () => {
  let component: FormInExpandAndDialogComponent;
  let fixture: ComponentFixture<FormInExpandAndDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInExpandAndDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInExpandAndDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
