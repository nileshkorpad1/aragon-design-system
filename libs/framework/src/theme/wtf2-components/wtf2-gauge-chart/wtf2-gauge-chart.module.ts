import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2GaugeChartComponent } from './wtf2-gauge-chart.component';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';

@NgModule({
  imports: [
    CommonModule,
    Wtf2CoreModule,
    Wtf2SkeletonModule,
  ],
  declarations: [Wtf2GaugeChartComponent],
  exports: [Wtf2GaugeChartComponent]
})
export class Wtf2GaugeChartModule { }
