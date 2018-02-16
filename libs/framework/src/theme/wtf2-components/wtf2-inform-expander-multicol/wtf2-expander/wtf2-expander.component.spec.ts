import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2ExpanderComponent } from './wtf2-expander.component';

describe('Wtf2ExpanderComponent', () => {
  let component: Wtf2ExpanderComponent;
  let fixture: ComponentFixture<Wtf2ExpanderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2ExpanderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2ExpanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
