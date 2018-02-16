import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2ButtonModule } from '@wtf2/theme/wtf2-material/button';
import {
    Wtf2SideDialogComponent,
        Wtf2SideDialogActionComponent,
} from './wtf2-side-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        Wtf2ButtonModule,
        Wtf2CoreModule,
    ],
    declarations: [
        Wtf2SideDialogComponent,
        Wtf2SideDialogActionComponent,
    ],
    exports: [
        Wtf2SideDialogComponent,
        Wtf2SideDialogActionComponent,
    ],

})

export class Wtf2SideDialogModule {

}
