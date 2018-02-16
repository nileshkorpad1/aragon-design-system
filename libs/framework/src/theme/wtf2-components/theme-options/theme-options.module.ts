import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Wtf2ButtonModule, Wtf2DividerModule,
     Wtf2FormFieldModule,
     Wtf2IconModule, Wtf2OptionModule, Wtf2RadioModule,
     Wtf2SelectModule, Wtf2SlideToggleModule } from '../../wtf2-material';

import { Wtf2DirectivesModule } from '../../directives/directives';
import { Wtf2SidebarModule } from '../wtf2-sidebar/sidebar.module';
import { Wtf2MaterialColorPickerModule } from '../material-color-picker/material-color-picker.module';

import { Wtf2ThemeOptionsComponent } from '../theme-options/theme-options.component';

@NgModule({
    declarations: [
        Wtf2ThemeOptionsComponent,
    ],
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        Wtf2ButtonModule,
        Wtf2DividerModule,
        Wtf2FormFieldModule,
        Wtf2IconModule,
        Wtf2OptionModule,
        Wtf2RadioModule,
        Wtf2SelectModule,
        Wtf2SlideToggleModule,

        Wtf2DirectivesModule,
        Wtf2MaterialColorPickerModule,
        Wtf2SidebarModule,
    ],
    exports     : [
        Wtf2ThemeOptionsComponent,
    ],
})
export class Wtf2ThemeOptionsModule {
}
