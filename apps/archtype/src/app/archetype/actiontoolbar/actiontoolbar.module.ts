import { ActiontoolbarComponent } from './actiontoolbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2ExpansionToolbarModule } from '@wtf2/theme/wtf2-components/wtf2-expansion-toolbar/wtf2-expansion-toolbar.module';
import { HttpModule } from '@angular/http';
import { Wtf2GridModule } from '@wtf2/theme/wtf2-components/wtf2-grid/wtf2-grid.module';

import { Wtf2HideButtonModule } from '@wtf2/theme/wtf2-components/wtf2-hide-button//wtf2-hide-button.module.ts';
import { Wtf2PriceFormatModule } from '@wtf2/theme/wtf2-components/wtf2-price-format/wtf2-price-format.module.ts';

import {
  Wtf2IconModule,
  Wtf2PaginatorModule,
  Wtf2SelectModule,
  Wtf2OptionModule,
  Wtf2CheckboxModule,
  Wtf2TableModule,
  Wtf2ProgressSpinnerModule,
  Wtf2MenuModule,
  Wtf2TabsModule,
} from '@wtf2/theme/wtf2-material';
import { DataServiceService } from './data-service.service';
const routes = [
  {
    path: 'actiontoolbar',
    component: ActiontoolbarComponent,
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
    Wtf2ExpansionToolbarModule,
    HttpModule,
    Wtf2IconModule,
    Wtf2PaginatorModule,
    Wtf2SelectModule,
    Wtf2OptionModule,
    Wtf2CheckboxModule,
    Wtf2TableModule,
    Wtf2ProgressSpinnerModule,
    Wtf2GridModule,
    Wtf2HideButtonModule,
    Wtf2PriceFormatModule,
    Wtf2MenuModule,
    Wtf2TabsModule,
  ],
  declarations: [ActiontoolbarComponent],
  providers: [DataServiceService],
  entryComponents: [],
})
export class ActiontoolbarModule {}
