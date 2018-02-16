import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2C3AreaComponent } from './wtf2-c3-area.component';

describe('Wtf2C3AreaComponent', () => {
  let component: Wtf2C3AreaComponent;
  let fixture: ComponentFixture<Wtf2C3AreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2C3AreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2C3AreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
