import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2DialogHideButtonComponent } from './wtf2-dialog-hide-button.component';
import { Wtf2ButtonModule } from '@wtf2/theme/wtf2-material';
@NgModule({
  imports: [CommonModule,  Wtf2ButtonModule],
  declarations: [Wtf2DialogHideButtonComponent],
  exports: [Wtf2DialogHideButtonComponent],
})
export class Wtf2DialogHideButtonModule {}
