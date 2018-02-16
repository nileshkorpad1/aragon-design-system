import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
// import {
//   Wtf2ButtonModule,
//   Wtf2DividerModule,
//   Wtf2FormFieldModule,
//   Wtf2IconModule,
//   Wtf2InputModule,
//   Wtf2ListModule,
//   Wtf2MenuModule,
//   Wtf2TooltipModule,
// } from '@wtf2/theme/wtf2-material';
import { CookieService } from 'ngx-cookie-service';

import { Wtf2ShortcutsComponent } from './shortcuts.component';
import { Wtf2ButtonModule, Wtf2DividerModule, Wtf2FormFieldModule, Wtf2IconModule, Wtf2InputModule, Wtf2MenuModule, Wtf2ListModule, Wtf2TooltipModule } from '../../wtf2-material';

@NgModule({
  declarations: [Wtf2ShortcutsComponent],
  imports: [
    CommonModule,
    RouterModule,

    FlexLayoutModule,

    Wtf2ButtonModule,
    Wtf2DividerModule,
    Wtf2FormFieldModule,
    Wtf2IconModule,
    Wtf2InputModule,
    Wtf2MenuModule,
    Wtf2ListModule,
    Wtf2TooltipModule,
  ],
  exports: [Wtf2ShortcutsComponent],
  providers: [CookieService],
})
export class Wtf2ShortcutsModule {}
