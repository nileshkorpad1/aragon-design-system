import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2SplitButtonComponent } from './wtf2-split-button.component';

describe('Wtf2SplitButtonComponent', () => {
  let component: Wtf2SplitButtonComponent;
  let fixture: ComponentFixture<Wtf2SplitButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2SplitButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2SplitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
