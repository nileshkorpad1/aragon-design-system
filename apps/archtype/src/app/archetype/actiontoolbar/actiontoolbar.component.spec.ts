import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiontoolbarComponent } from './actiontoolbar.component';

describe('ActiontoolbarComponent', () => {
  let component: ActiontoolbarComponent;
  let fixture: ComponentFixture<ActiontoolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiontoolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiontoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
