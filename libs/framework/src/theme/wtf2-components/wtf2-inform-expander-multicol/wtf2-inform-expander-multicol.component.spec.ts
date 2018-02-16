import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2InformExpanderMultiComponent } from './wtf2-inform-expander-multi.component';

describe('Wtf2InformExpanderMultiComponent', () => {
  let component: Wtf2InformExpanderMultiComponent;
  let fixture: ComponentFixture<Wtf2InformExpanderMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2InformExpanderMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2InformExpanderMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
