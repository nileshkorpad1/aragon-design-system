import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2PasswordStrengthComponent } from './wtf2-password-strength.component';

describe('Wtf2PasswordStrengthComponent', () => {
  let component: Wtf2PasswordStrengthComponent;
  let fixture: ComponentFixture<Wtf2PasswordStrengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2PasswordStrengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2PasswordStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
