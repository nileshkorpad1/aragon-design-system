export interface CustomClass {
  name: string;
  class: string;
  tag?: string;
}

export interface Font {
  name: string;
  class: string;
}
export interface Toolbar {}
export interface Wtf2EditorConfig {
  editable?: boolean;
  spellcheck?: boolean;
  height?: 'auto' | string;
  minHeight?: '0' | string;
  maxHeight?: 'auto' | string;
  width?: 'auto' | string;
  minWidth?: '0' | string;
  translate?: 'yes' | 'now' | string;
  enableToolbar?: boolean;
  showToolbar?: boolean;
  placeholder?: string;
  defaultParagraphSeparator?: string;
  defaultFontName?: string;
  defaultFontSize?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | string;
  uploadUrl?: string;
  toolbar?: Toolbar[];
  fonts?: Font[];
  customClasses?: CustomClass[];
}
// tslint:disable-next-line:class-name
export const wtf2EditorConfig: Wtf2EditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'auto',
  minHeight: '0',
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
    {class: 'arial', name: 'Arial'},
    {class: 'times-new-roman', name: 'Times New Roman'},
  ],
  uploadUrl: 'v1/image',
};
