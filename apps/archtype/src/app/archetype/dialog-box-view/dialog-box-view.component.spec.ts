import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxViewComponent } from './dialog-box-view.component';

describe('DialogBoxViewComponent', () => {
  let component: DialogBoxViewComponent;
  let fixture: ComponentFixture<DialogBoxViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
