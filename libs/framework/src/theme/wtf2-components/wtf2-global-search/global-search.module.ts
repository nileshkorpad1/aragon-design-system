import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Wtf2ButtonModule, Wtf2IconModule, Wtf2AutocompleteModule } from '@wtf2/theme/wtf2-material';
import {
    Wtf2FormFieldModule,
    Wtf2InputModule,
} from '../../wtf2-material';

import { Wtf2GlobalSearchComponent } from './global-search.component';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';

@NgModule({
    declarations: [Wtf2GlobalSearchComponent],
    imports: [
        CommonModule,
        RouterModule,
        Wtf2ButtonModule,
        Wtf2IconModule,
        Wtf2FormFieldModule,
        Wtf2FormFieldModule,
        Wtf2InputModule,
        Wtf2InputModule,
        Wtf2AutocompleteModule,
        Wtf2CoreModule,
        Wtf2InputModule,
    ],
    exports: [Wtf2GlobalSearchComponent]
})
export class Wtf2GlobalSearchModule {}
