import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2InformExpanderFullwidthComponent } from './wtf2-inform-expander-fullwidth.component';
import { Wtf2ButtonModule } from '@wtf2/theme/wtf2-material';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';

@NgModule({
  imports: [
    CommonModule,
    Wtf2ButtonModule,
    Wtf2CoreModule,
  ],
  declarations: [Wtf2InformExpanderFullwidthComponent],
  exports: [Wtf2InformExpanderFullwidthComponent],
})
export class Wtf2InformExpanderFullwidthModule { }
