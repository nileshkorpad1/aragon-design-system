import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2C3ChartComponent } from './wtf2-c3-chart.component';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2IconModule } from '../../wtf2-material';
@NgModule({
  declarations: [Wtf2C3ChartComponent],
  imports: [
    CommonModule,
    Wtf2CoreModule,
    Wtf2IconModule,
  ],
  exports: [Wtf2C3ChartComponent]
})
export class Wtf2C3ChartModule { }
