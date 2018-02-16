import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { DashboardComponent } from './dashboard.component';
import { Wtf2DatatableModule } from '@wtf2/theme/wtf2-components/wtf2-datatable';
import { Wtf2CardModule, Wtf2TabsModule, Wtf2IconModule, Wtf2DividerModule, Wtf2MenuModule, Wtf2ListModule } from '@wtf2/theme/wtf2-material';

const routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
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

    declarations: [DashboardComponent],
})
export class DashboardModule {}
