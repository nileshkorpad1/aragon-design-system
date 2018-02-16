import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Wtf2ButtonModule, Wtf2IconModule, Wtf2MenuModule, Wtf2RippleModule, Wtf2FormFieldModule } from '../../wtf2-material';

import { Wtf2PipesModule } from '../../../pipes/pipes.module';

import { Wtf2MaterialColorPickerComponent } from './material-color-picker.component';
import { Wtf2InputModule } from '@wtf2/theme/wtf2-material';

@NgModule({
    declarations: [
        Wtf2MaterialColorPickerComponent,
    ],
    imports: [
        CommonModule,

        FlexLayoutModule,
        Wtf2InputModule,
        Wtf2FormFieldModule,
        Wtf2ButtonModule,
        Wtf2IconModule,
        Wtf2MenuModule,
        Wtf2RippleModule,

        Wtf2PipesModule,
    ],
    exports: [
        Wtf2MaterialColorPickerComponent,
    ],
})
export class Wtf2MaterialColorPickerModule {
}
