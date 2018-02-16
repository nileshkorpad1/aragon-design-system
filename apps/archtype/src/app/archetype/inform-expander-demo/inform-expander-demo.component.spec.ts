import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformExpanderDemoComponent } from './inform-expander-demo.component';

describe('InformExpanderDemoComponent', () => {
  let component: InformExpanderDemoComponent;
  let fixture: ComponentFixture<InformExpanderDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformExpanderDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformExpanderDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
