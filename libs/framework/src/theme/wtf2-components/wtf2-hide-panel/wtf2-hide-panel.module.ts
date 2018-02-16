import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2ButtonModule } from '../../wtf2-material';
import { Wtf2CoreModule } from '../../wtf2Core.module';
import { Wtf2HidePanel } from './wtf2-hide-panel.component';

@NgModule({
  imports: [CommonModule, Wtf2ButtonModule, Wtf2CoreModule],
  declarations: [Wtf2HidePanel],
  exports: [Wtf2HidePanel],
})
export class Wtf2HidePanelModule {
  @Input() isOpen = false;

}
