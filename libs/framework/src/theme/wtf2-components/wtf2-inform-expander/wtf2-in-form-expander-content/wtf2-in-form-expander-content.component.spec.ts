import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2InFormExpanderContentComponent } from './wtf2-in-form-expander-content.component';

describe('Wtf2InFormExpanderContentComponent', () => {
  let component: Wtf2InFormExpanderContentComponent;
  let fixture: ComponentFixture<Wtf2InFormExpanderContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2InFormExpanderContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2InFormExpanderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
