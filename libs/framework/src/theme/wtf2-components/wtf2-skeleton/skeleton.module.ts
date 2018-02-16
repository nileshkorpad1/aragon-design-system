import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2SkeletonComponent } from './skeleton.component';
import {
  Wtf2PageHeaderComponent,
  Wtf2PageHeaderTitle,
  Wtf2PageHeaderSubtitle,
} from './page-header.component';
import { Wtf2ContentComponent} from './page-content.component';
import { Wtf2PageHeadingComponent } from './wtf2-page-heading.component';
import { Wtf2ButtonModule, Wtf2IconModule } from '@wtf2/theme/wtf2-material';
import { FillHeightModule } from './fill-height/fill-height.module';
// import { Wtf2CoreModule } from '../../wtf2Core.module';

@NgModule({
  imports: [
    CommonModule,
    Wtf2ButtonModule,
    Wtf2IconModule,
    FillHeightModule,
    // Wtf2CoreModule,
  ],
  declarations: [
    Wtf2SkeletonComponent,
    Wtf2PageHeaderComponent,
    Wtf2ContentComponent,
    Wtf2PageHeaderTitle,
    Wtf2PageHeaderSubtitle,
     Wtf2PageHeadingComponent,

  ],
  exports: [
    Wtf2SkeletonComponent,
    Wtf2PageHeaderComponent,
    Wtf2ContentComponent,
    Wtf2PageHeaderTitle,
    Wtf2PageHeaderSubtitle,
    Wtf2PageHeadingComponent,

  ],
})
export class Wtf2SkeletonModule {}
