import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Error500Component } from './error-500.component';

const routes = [
    {
        path     : 'error-500',
        component: Error500Component,
    }
];

@NgModule({
    declarations: [
        Error500Component,
    ],
    imports     : [
        RouterModule.forChild(routes),
        CommonModule,
        Wtf2SkeletonModule,
        Wtf2SidebarModule,
        Wtf2ListModule,
        Wtf2DividerModule,
        Wtf2CoreModule,
    ],
})
export class Error500Module
{
}
