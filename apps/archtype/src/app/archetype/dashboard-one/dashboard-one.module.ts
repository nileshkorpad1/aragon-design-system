import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { RouterModule } from '@angular/router';
import { DashboardOneComponent } from './dashboard-one.component';
import { Wtf2CardModule, Wtf2TabsModule, Wtf2IconModule, Wtf2DividerModule, Wtf2MenuModule, Wtf2ListModule } from '@wtf2/theme/wtf2-material';
import { Wtf2DatatableModule } from '@wtf2/theme/wtf2-components/wtf2-datatable';
const routes = [
  {
    path: 'dashboard-one',
    component: DashboardOneComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Wtf2SkeletonModule,
    Wtf2CoreModule,
    Wtf2CardModule,
    Wtf2TabsModule,
    Wtf2IconModule,
    Wtf2DividerModule,
    Wtf2MenuModule,
    Wtf2ListModule,
    Wtf2DatatableModule,
  ],
  declarations: [DashboardOneComponent]
})
export class DashboardOneModule { }
