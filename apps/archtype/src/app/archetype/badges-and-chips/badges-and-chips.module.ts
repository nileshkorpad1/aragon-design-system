import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgesAndChipsComponent } from './badges-and-chips.component';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2BadgeModule } from '@wtf2/theme/wtf2-material/badge';
import { Wtf2IconModule, Wtf2ChipsModule, Wtf2SelectModule, Wtf2AutocompleteModule } from '@wtf2/theme/wtf2-material';
const routes = [
  {
    path: 'badgesandchips',
    component: BadgesAndChipsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Wtf2SkeletonModule,
    Wtf2ListModule,
    Wtf2SidebarModule,
    Wtf2DividerModule,
    Wtf2BadgeModule,
    Wtf2CoreModule,
    Wtf2IconModule,
    Wtf2ChipsModule,
    Wtf2SelectModule,
    Wtf2AutocompleteModule,
  ],
  declarations: [BadgesAndChipsComponent]
})
export class BadgesAndChipsModule { }
