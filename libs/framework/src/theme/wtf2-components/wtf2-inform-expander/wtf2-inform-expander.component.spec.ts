import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2InformExpanderComponent } from './wtf2-inform-expander.component';

describe('Wtf2InformExpanderComponent', () => {
  let component: Wtf2InformExpanderComponent;
  let fixture: ComponentFixture<Wtf2InformExpanderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2InformExpanderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2InformExpanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
