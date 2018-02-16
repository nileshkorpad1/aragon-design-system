import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2QuoteDemoComponent } from './wtf2-quote-demo.component';
import { RouterModule } from '@angular/router';
import { Wtf2QuoteModule } from '@wtf2/theme/wtf2-components/wtf2-quote/wtf2-quote.module';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2CardModule } from '@wtf2/theme/wtf2-material';



const routes = [
  {
    path: 'wtf2-quote-demo',
    component: Wtf2QuoteDemoComponent,
  }];
@NgModule({
  imports: [CommonModule,
     RouterModule.forChild(routes),
     Wtf2QuoteModule,
    Wtf2SkeletonModule,
    Wtf2CardModule,
     Wtf2CoreModule,],
    declarations: [Wtf2QuoteDemoComponent],
})
export class Wtf2QuoteDemoModule {}
