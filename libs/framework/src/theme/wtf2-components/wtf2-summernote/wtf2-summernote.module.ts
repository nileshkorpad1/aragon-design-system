import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2SummernoteDirective } from './wtf2-summernote.directive';
import { Wtf2SummernoteViewDirective } from './wtf2-summernote-view.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [Wtf2SummernoteDirective, Wtf2SummernoteViewDirective],
  exports: [Wtf2SummernoteDirective, Wtf2SummernoteViewDirective],
})
export class Wtf2SummernoteModule { }
