import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagelayoutLeftSidenavSimpleComponent } from './pagelayout-left-sidenav-simple.component';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
const routes = [
  {
    path: 'pagelayout-left-sidenav-simple',
    component: PagelayoutLeftSidenavSimpleComponent,
  },
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        Wtf2SkeletonModule,
        Wtf2SidebarModule,
        Wtf2ListModule,
        Wtf2DividerModule,
        Wtf2CoreModule,
        ScrollingModule,
    ],
    declarations: [PagelayoutLeftSidenavSimpleComponent]
})
export class PagelayoutLeftSidenavSimpleModule {}
