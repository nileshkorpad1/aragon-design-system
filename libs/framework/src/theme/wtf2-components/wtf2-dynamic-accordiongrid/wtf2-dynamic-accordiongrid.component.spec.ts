import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2DynamicAccordiongridComponent } from './wtf2-dynamic-accordiongrid.component';

describe('Wtf2DynamicAccordiongridComponent', () => {
  let component: Wtf2DynamicAccordiongridComponent;
  let fixture: ComponentFixture<Wtf2DynamicAccordiongridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2DynamicAccordiongridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2DynamicAccordiongridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
