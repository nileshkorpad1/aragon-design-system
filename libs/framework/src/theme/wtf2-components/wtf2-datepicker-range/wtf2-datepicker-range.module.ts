import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
    Wtf2ButtonModule,
    Wtf2IconModule,
    Wtf2DatepickerModule,
    Wtf2NativeDateModule,
    Wtf2Calendar,
} from '@wtf2/theme/wtf2-material';
import { Wtf2FormFieldModule, Wtf2InputModule } from '../../wtf2-material';
import { Wtf2DatepickerRangeComponent } from './wtf2-datepicker-range.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2DatepickerRangeService } from './wtf2-datepicker-range.service';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        Wtf2ButtonModule,
        Wtf2IconModule,
        Wtf2FormFieldModule,
        Wtf2FormFieldModule,
        Wtf2InputModule,
        Wtf2CoreModule,
        Wtf2DatepickerModule,
        ReactiveFormsModule,
        Wtf2FormFieldModule,
        Wtf2NativeDateModule,
    ],
    declarations: [Wtf2DatepickerRangeComponent],
    exports: [Wtf2DatepickerRangeComponent],
    providers: [Wtf2DatepickerRangeService],
})
export class Wtf2DatepickerRangeModule {}
