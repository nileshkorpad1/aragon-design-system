import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2ExpanderControlComponent } from './wtf2-expander-control.component';

describe('Wtf2ExpanderControlComponent', () => {
  let component: Wtf2ExpanderControlComponent;
  let fixture: ComponentFixture<Wtf2ExpanderControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2ExpanderControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2ExpanderControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
