import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2GaugeDemoComponent } from './wtf2-gauge-demo.component';

describe('Wtf2GaugeDemoComponent', () => {
  let component: Wtf2GaugeDemoComponent;
  let fixture: ComponentFixture<Wtf2GaugeDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2GaugeDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2GaugeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
