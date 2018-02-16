import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2NestedGridComponent } from './wtf2-nested-grid.component';

describe('Wtf2NestedGridComponent', () => {
  let component: Wtf2NestedGridComponent;
  let fixture: ComponentFixture<Wtf2NestedGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2NestedGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2NestedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
