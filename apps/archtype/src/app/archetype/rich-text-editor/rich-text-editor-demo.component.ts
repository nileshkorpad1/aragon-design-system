import { Component, OnInit } from '@angular/core';
import { Wtf2EditorConfig } from '@wtf2/theme/wtf2-components/wtf2-editor/config';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor-demo.component.html',
  styleUrls: ['./rich-text-editor-demo.component.scss'],
})
export class RichTextEditorDemoComponent  {
  editorConfig: Wtf2EditorConfig = {
    editable: true,
    spellcheck: true,
    height: '150px',
    minHeight: '150px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    toolbar: ['undo', 'redo', 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript',
      'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'outdent', 'indent', 'insertunorderedlist', 'insertorderedlist',
      'heading', 'fontselector', 'fontsizeselector', 'foregroundcolor', 'backgroundcolor', 'removeformat','toggleeditormode'
    ],
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
    ],
  };

}
