import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { SpinnerDemoComponent } from './spinner-demo.component';
import { Wtf2ProgressSpinnerModule } from '@wtf2/theme/wtf2-material';

const routes = [
    {
        path: 'wtf2-spinner-demo-component',
        component: SpinnerDemoComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        Wtf2SkeletonModule,
        Wtf2CoreModule,
        Wtf2ProgressSpinnerModule
    ],
    declarations: [SpinnerDemoComponent],
})
export class SpinnerDemoModule {}
