import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerDemoComponent } from './spinner-demo.component';

describe('SpinnerDemoComponent', () => {
  let component: SpinnerDemoComponent;
  let fixture: ComponentFixture<SpinnerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
