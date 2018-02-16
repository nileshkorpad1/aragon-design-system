import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2InformExpanderMultiColComponent } from './wtf2-inform-expander-multicol.component';
import { Wtf2ExpanderComponent } from './wtf2-expander/wtf2-expander.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [Wtf2InformExpanderMultiColComponent, Wtf2ExpanderComponent],
  exports: [Wtf2InformExpanderMultiColComponent, Wtf2ExpanderComponent],
})
export class Wtf2InformExpanderMultiColModule { }
