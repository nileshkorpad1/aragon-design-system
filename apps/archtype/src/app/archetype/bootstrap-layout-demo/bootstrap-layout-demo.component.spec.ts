import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapLayoutDemoComponent } from './bootstrap-layout-demo.component';

describe('BootstrapLayoutDemoComponent', () => {
  let component: BootstrapLayoutDemoComponent;
  let fixture: ComponentFixture<BootstrapLayoutDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapLayoutDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapLayoutDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
