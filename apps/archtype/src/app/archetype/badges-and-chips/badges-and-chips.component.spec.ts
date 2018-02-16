import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesAndChipsComponent } from './badges-and-chips.component';

describe('BadgesAndChipsComponent', () => {
  let component: BadgesAndChipsComponent;
  let fixture: ComponentFixture<BadgesAndChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgesAndChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgesAndChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
