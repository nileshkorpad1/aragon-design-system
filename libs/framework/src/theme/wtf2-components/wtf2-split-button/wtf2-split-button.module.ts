import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    Wtf2SplitButtonComponent,
    Wtf2SplitButtonTitle,
} from './wtf2-split-button.component';
import { Wtf2ButtonModule, Wtf2IconModule } from '@wtf2/theme/wtf2-material';
import { Wtf2MenuModule } from '@wtf2/theme/wtf2-material/menu';
@NgModule({
    imports: [CommonModule, Wtf2ButtonModule, Wtf2MenuModule, Wtf2IconModule],
    declarations: [Wtf2SplitButtonComponent, Wtf2SplitButtonTitle],
    exports: [Wtf2SplitButtonComponent, Wtf2SplitButtonTitle]
})
export class Wtf2SplitButtonModule { }
