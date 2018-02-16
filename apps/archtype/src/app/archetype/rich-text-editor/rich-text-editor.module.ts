import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextEditorDemoComponent } from './rich-text-editor-demo.component';
import { RouterModule } from '@angular/router';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2EditorModule } from '@wtf2/theme/wtf2-components/wtf2-editor';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components';
const routes = [
  {
    path: 'rich-text-editor',
    component: RichTextEditorDemoComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Wtf2CoreModule,
    Wtf2EditorModule,
    Wtf2SkeletonModule
  ],
  declarations: [RichTextEditorDemoComponent],
})
export class RichTextEditorDemo { }
