import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2ButtonModule, Wtf2SidenavModule, Wtf2ExpansionModule, Wtf2IconModule } from '../../wtf2-material';
import { Wtf2CoreModule } from '../../wtf2Core.module';
import { Wtf2HideButton } from './wtf2-hide-button.component';

@NgModule({
  imports: [CommonModule, Wtf2ButtonModule, Wtf2CoreModule,
  Wtf2SidenavModule,
Wtf2ExpansionModule,
Wtf2IconModule],
  declarations: [Wtf2HideButton],
  exports: [Wtf2HideButton],
})
export class Wtf2HideButtonModule {
  @Input() isOpen = false;

}
