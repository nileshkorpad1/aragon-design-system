import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextEditorDemoComponent } from './rich-text-editor-demo.component';

describe('RichTextEditorDemoComponent', () => {
  let component: RichTextEditorDemoComponent;
  let fixture: ComponentFixture<RichTextEditorDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichTextEditorDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichTextEditorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
