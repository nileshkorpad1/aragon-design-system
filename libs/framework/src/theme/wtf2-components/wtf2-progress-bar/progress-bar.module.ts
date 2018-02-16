import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// import { Wtf2ButtonModule, Wtf2IconModule, Wtf2ProgressBarModule } from '@wtf2/theme/wtf2-material';
import { Wtf2ButtonModule, Wtf2IconModule, Wtf2ProgressBarModule } from '@wtf2/theme/wtf2-material';

import { Wtf2ProgressBarComponent } from './progress-bar.component';

@NgModule({
    declarations: [
        Wtf2ProgressBarComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,

        Wtf2ButtonModule,
        Wtf2IconModule,
        Wtf2ProgressBarModule,
    ],
    exports: [
        Wtf2ProgressBarComponent,
    ],
})
export class Wtf2CustomProgressBarModule {
}
