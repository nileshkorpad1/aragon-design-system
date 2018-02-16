import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GraphComponent } from './graph.component';

import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2GaugeChartModule } from '@wtf2/theme/wtf2-components/wtf2-gauge-chart/wtf2-gauge-chart.module';
import { PieComponent } from './pie/pie.component';
import { LineComponent } from './line/line.component';
import { RadarComponent } from './radar/radar.component';
import { DonutComponent } from './donut/donut.component';
import { StackedbarComponent } from './stackedbar/stackedbar.component';
import { StepComponent } from './step/step.component';
import { GaugeComponent } from './gauge/gauge.component';
import { Wtf2GaugeDemoComponent } from './wtf2-gauge-demo/wtf2-gauge-demo.component';
import { Wtf2C3BarchartComponent } from './wtf2-c3-chart/wtf2-c3-barchart/wtf2-c3-barchart.component';
import { Wtf2C3PiechartComponent } from './wtf2-c3-chart/wtf2-c3-piechart/wtf2-c3-piechart.component';
import { Wtf2C3LinechartComponent } from './wtf2-c3-chart/wtf2-c3-linechart/wtf2-c3-linechart.component';
import { Wtf2C3GroupbarchartComponent } from './wtf2-c3-chart/wtf2-c3-groupbarchart/wtf2-c3-groupbarchart.component';
import { Wtf2C3HorizontalbarchartComponent } from './wtf2-c3-chart/wtf2-c3-horizontalbarchart/wtf2-c3-horizontalbarchart.component';
import { Wtf2C3ChartModule } from '@wtf2/theme/wtf2-components/wtf2-c3-chart/wtf2-c3-chart.module';
import { Wtf2C3AreaComponent } from './wtf2-c3-chart/wtf2-c3-area/wtf2-c3-area.component';
import { Wtf2C3DonutchartComponent } from './wtf2-c3-chart/wtf2-c3-donutchart/wtf2-c3-donutchart.component';
import { Wtf2C3StackedbarchartComponent } from './wtf2-c3-chart/wtf2-c3-stackedbarchart/wtf2-c3-stackedbarchart.component';
import { Wtf2C3GaugechartComponent } from './wtf2-c3-chart/wtf2-c3-gaugechart/wtf2-c3-gaugechart.component';
import { Wtf2CardModule, Wtf2DividerModule, Wtf2FormFieldModule } from '@wtf2/theme/wtf2-material';
// import { Wtf2DatatableModule } from '@wtf2/theme/wtf2-components/wtf2-datatable';

const routes = [
  {
    path: 'bar',
    component: GraphComponent,
  },
  {
    path: 'pie',
    component: PieComponent,
  },
  {
    path: 'line',
    component: LineComponent,
  },
  {
    path: 'radar',
    component: RadarComponent,
  },
  {
    path: 'donut',
    component: DonutComponent,
  },
  {
    path: 'stack',
    component: StackedbarComponent,
  },
  {
    path: 'step',
    component: StepComponent,
  },
  {
    path: 'gauge',
    component: GaugeComponent,
  },
  {
    path: 'wtf2-gauge-demo',
    component: Wtf2GaugeDemoComponent
  },
  {
    path: 'wtf2-c3bar',
    component: Wtf2C3BarchartComponent
  },
  {
    path: 'wtf2-c3pie',
    component: Wtf2C3PiechartComponent
  },
  {
    path: 'wtf2-c3line',
    component: Wtf2C3LinechartComponent
  },
  {
    path: 'wtf2-c3groupbar',
    component: Wtf2C3GroupbarchartComponent
  },
  {
    path: 'wtf2-c3area',
    component: Wtf2C3AreaComponent
  },
  {
    path: 'wtf2-c3horizontalbar',
    component: Wtf2C3HorizontalbarchartComponent
  },
  {
    path: 'wtf2-donut',
    component: Wtf2C3DonutchartComponent
  },
  {
    path: 'wtf2-c3stackedbar',
    component: Wtf2C3StackedbarchartComponent
  },
  {
    path:'wtf2-c3gauge',
    component: Wtf2C3GaugechartComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Wtf2SkeletonModule,
    Wtf2CoreModule,
    Wtf2GaugeChartModule,
    Wtf2C3ChartModule,
    Wtf2CardModule,
    Wtf2DividerModule,
    Wtf2FormFieldModule,

    // Wtf2DatatableModule,
  ],
  declarations: [
    GraphComponent,
    PieComponent,
    LineComponent,
    RadarComponent,
    DonutComponent,
    StackedbarComponent,
    StepComponent,
    GaugeComponent,
    Wtf2GaugeDemoComponent,
    Wtf2C3BarchartComponent,
    Wtf2C3PiechartComponent,
    Wtf2C3LinechartComponent,
    Wtf2C3GroupbarchartComponent,
    Wtf2C3HorizontalbarchartComponent,
    Wtf2C3AreaComponent,
    Wtf2C3DonutchartComponent,
    Wtf2C3StackedbarchartComponent,
    Wtf2C3GaugechartComponent,
    // Wtf2CardModule
  ],
})
export class GraphModule { }
