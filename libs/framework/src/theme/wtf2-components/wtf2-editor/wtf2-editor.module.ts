import {NgModule} from '@angular/core';
import {Wtf2EditorComponent} from './wtf2-editor.component';
import {Wtf2EditorToolbarComponent} from './wtf2-editor-toolbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
  ],
  declarations: [Wtf2EditorComponent, Wtf2EditorToolbarComponent],
  exports: [Wtf2EditorComponent, Wtf2EditorToolbarComponent],
})
export class Wtf2EditorModule {
}
