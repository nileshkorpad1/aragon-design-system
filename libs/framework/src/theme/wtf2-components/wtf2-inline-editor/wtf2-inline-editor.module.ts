import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2InlineEditorComponent } from './wtf2-inline-editor.component';
import { InputBase } from './inputs/input-base';
import { FormsModule } from '@angular/forms';
import { AutosizeModule } from './inputs/autosize.module';
import {
  InputTimeComponent,
  InputDateComponent,
  InputDatetimeComponent,
  InputNumberComponent,
  InputRangeComponent,
  InputPasswordComponent,
  InputSelectComponent,
  InputTextareaComponent,
  InputTextComponent,
  InputCheckboxComponent,
  InputCardedSelectComponent,
  DialogDataExampleDialog,
} from './inputs/index';
import {
  Wtf2ButtonModule, Wtf2DividerModule,
  Wtf2FormFieldModule,
  Wtf2IconModule,
  Wtf2DatepickerModule,
  Wtf2InputModule,
  Wtf2SelectModule,
  Wtf2MenuModule,
  Wtf2DialogModule,
  //  Wtf2OptionModule, Wtf2RadioModule,
  // Wtf2SelectModule
} from '../../wtf2-material';

import { Wtf2CardModule } from '../../wtf2-material/card/card-module';
// import { Wtf2DialogModule } from '@wtf2/theme/wtf2-material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
// import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import {
  Wtf2NativeDateModule,
} from '@wtf2/theme/wtf2-material';
import { DynamicFieldDirective } from '../wtf2-dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from '../wtf2-dynamic-forms/dynamic-form.component';
import { Wtf2CoreModule } from '../../wtf2Core.module';

const EXPORTS = [
  Wtf2InlineEditorComponent,
  InputBase,
  InputTextComponent,
  InputNumberComponent,
  InputPasswordComponent,
  InputRangeComponent,
  InputTextareaComponent,
  InputSelectComponent,
  InputDateComponent,
  InputTimeComponent,
  InputDatetimeComponent,
  InputCheckboxComponent,
  InputCardedSelectComponent,
  DialogDataExampleDialog,
  DynamicFieldDirective,
  DynamicFormComponent,
];

@NgModule({
  imports: [
    CommonModule,
    Wtf2ButtonModule,
    Wtf2DividerModule,
    Wtf2FormFieldModule,
    Wtf2IconModule,
    FormsModule,
    Wtf2DatepickerModule,
    Wtf2InputModule,
    Wtf2CardModule,
    Wtf2SelectModule,
    Wtf2MenuModule,
    Wtf2DialogModule,
    ReactiveFormsModule,
    AutosizeModule,
    Wtf2CoreModule,
    Wtf2NativeDateModule,
    // DynamicFieldDirective,
    // DynamicFormComponent,
    // InputBase,
  ],
  declarations: EXPORTS,
  exports: [Wtf2InlineEditorComponent],
  entryComponents: [DialogDataExampleDialog],
})
export class Wtf2InlineEditorModule { }
