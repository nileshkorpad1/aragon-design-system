import { NgModule } from '@angular/core';
import { Wtf2ButtonModule, Wtf2DialogModule } from '@wtf2/theme/wtf2-material';

import { Wtf2ConfirmDialogComponent } from './wtf2-confirm-dialog.component';

@NgModule({
    declarations: [
        Wtf2ConfirmDialogComponent,
    ],
    imports: [
        Wtf2DialogModule,
        Wtf2ButtonModule,
    ],
    entryComponents: [
        Wtf2ConfirmDialogComponent,
    ],
})
export class Wtf2ConfirmDialogModule {
}
