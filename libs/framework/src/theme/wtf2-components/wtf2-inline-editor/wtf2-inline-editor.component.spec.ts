import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2InlineEditorComponent } from './wtf2-inline-editor.component';

describe('Wtf2InlineEditorComponent', () => {
  let component: Wtf2InlineEditorComponent;
  let fixture: ComponentFixture<Wtf2InlineEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2InlineEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2InlineEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
