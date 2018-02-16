import { SearchComponent } from './search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2SearchBarModule, Wtf2GlobalSearchModule } from '@wtf2/theme/wtf2-components';
import { Wtf2CardModule } from '@wtf2/theme/wtf2-material';

const routes = [
    {
        path: 'search',
        component: SearchComponent,
    }
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
        Wtf2SearchBarModule,
        Wtf2GlobalSearchModule,
        Wtf2CardModule
    ],
    declarations: [SearchComponent],

    providers: [
        Wtf2GlobalSearchModule,
    ],
})
export class SearchModule {}
