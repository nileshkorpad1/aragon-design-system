import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElevationDemoComponent } from './elevation-demo.component';
import { RouterModule } from '@angular/router';
import { Wtf2HideButtonModule } from '@wtf2/theme/wtf2-components/wtf2-hide-button//wtf2-hide-button.module.ts';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
const routes = [
    {
        path: 'elevation-demo',
    component: ElevationDemoComponent,
    },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), Wtf2HideButtonModule, Wtf2SkeletonModule, Wtf2CoreModule],
    declarations: [ElevationDemoComponent],
})
export class ElevationDemoModule {}
