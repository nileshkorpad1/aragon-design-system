import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Wtf2ButtonModule, Wtf2IconModule } from '@wtf2/theme/wtf2-material';
import {
    Wtf2FormFieldModule,
    Wtf2InputModule,
} from '../../wtf2-material';

import { Wtf2SearchBarComponent } from './search-bar.component';

@NgModule({
    declarations: [
        Wtf2SearchBarComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,

        Wtf2ButtonModule,
        Wtf2IconModule,
        Wtf2FormFieldModule,
        Wtf2InputModule,
    ],
    exports: [
        Wtf2SearchBarComponent,
    ],
})
export class Wtf2SearchBarModule {
}
