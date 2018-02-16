import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2DialogHideButtonComponent } from './wtf2-dialog-hide-button.component';

describe('Wtf2DialogHideButtonComponent', () => {
  let component: Wtf2DialogHideButtonComponent;
  let fixture: ComponentFixture<Wtf2DialogHideButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2DialogHideButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2DialogHideButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
