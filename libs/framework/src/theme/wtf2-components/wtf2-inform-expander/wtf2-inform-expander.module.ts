import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2InformExpanderComponent } from './wtf2-inform-expander.component';
import { Wtf2ButtonModule, Wtf2IconModule } from '@wtf2/theme/wtf2-material';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2InFormExpanderContentComponent } from './wtf2-in-form-expander-content/wtf2-in-form-expander-content.component';
@NgModule({
  imports: [
    CommonModule,
    Wtf2ButtonModule,
    Wtf2CoreModule,
    Wtf2IconModule,
  ],
  exports: [Wtf2InformExpanderComponent,],
  declarations: [Wtf2InformExpanderComponent, Wtf2InFormExpanderContentComponent],
})
export class Wtf2InformExpanderModule { }
