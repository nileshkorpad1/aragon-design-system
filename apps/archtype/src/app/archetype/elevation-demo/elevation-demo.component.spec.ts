import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevationDemoComponent } from './elevation-demo.component';

describe('ElevationDemoComponent', () => {
  let component: ElevationDemoComponent;
  let fixture: ComponentFixture<ElevationDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElevationDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
