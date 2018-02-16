import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2InformExpanderFullwidthComponent } from './wtf2-inform-expander-fullwidth.component';

describe('Wtf2InformExpanderFullwidthComponent', () => {
  let component: Wtf2InformExpanderFullwidthComponent;
  let fixture: ComponentFixture<Wtf2InformExpanderFullwidthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2InformExpanderFullwidthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2InformExpanderFullwidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
