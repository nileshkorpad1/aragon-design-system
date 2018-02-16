import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TosterDemoComponent } from './toster-demo.component';

describe('TosterDemoComponent', () => {
  let component: TosterDemoComponent;
  let fixture: ComponentFixture<TosterDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TosterDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TosterDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
