import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { Wtf2DirectivesModule } from './directives/directives';
import { Wtf2PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, Wtf2DirectivesModule, Wtf2PipesModule],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, Wtf2DirectivesModule, Wtf2PipesModule],
})
export class Wtf2CoreModule { }
