import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2CarouselComponent } from './wtf2-carousel.component';
import { SwipeService } from './swipe.service';
import { BrowserTransferStateModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserTransferStateModule,
  ],
  declarations: [
    Wtf2CarouselComponent,
  ],
  exports: [
    Wtf2CarouselComponent,
  ],
  providers: [
    SwipeService,
  ]
})
export class Wtf2CarouselModule { }
