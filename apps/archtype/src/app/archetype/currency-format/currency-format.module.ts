import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatComponent } from './currency-format.component';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2PriceFormatModule } from '@wtf2/theme/wtf2-components/wtf2-price-format/wtf2-price-format.module.ts';
const routes = [
  {
    path: 'currency-format',
    component: CurrencyFormatComponent,
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
    Wtf2PriceFormatModule,
  ],
  declarations: [CurrencyFormatComponent]
})
export class CurrencyFormatModule { }
