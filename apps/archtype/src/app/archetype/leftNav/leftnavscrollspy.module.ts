import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { leftNavwithScrollSpy } from './leftnavscrollspy.component';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2PriceFormatModule } from '@wtf2/theme/wtf2-components/wtf2-price-format/wtf2-price-format.module.ts';
const routes = [
    {
        path: 'leftnav-with-scrollspy',
        component: leftNavwithScrollSpy,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        Wtf2SkeletonModule,
        Wtf2DividerModule,
        Wtf2SidebarModule,
        Wtf2ListModule,
        Wtf2CoreModule,
        Wtf2PriceFormatModule,
    ],
    declarations: [leftNavwithScrollSpy],
})
export class LeftNavwithScrollspyModule {}
