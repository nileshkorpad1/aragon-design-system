import { NgModule } from '@angular/core';
import { Wtf2ButtonModule } from '@wtf2/theme/wtf2-material';
import {
    Wtf2ActionToolbarComponent,
} from './wtf2-action-toolbar.component';
import { Wtf2CardModule } from '@wtf2/theme/wtf2-material/card';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        Wtf2ActionToolbarComponent,
    ],
    imports: [
        Wtf2ButtonModule,
        Wtf2CardModule,
        Wtf2CoreModule,
        CommonModule,
    ],
    exports: [
        Wtf2ActionToolbarComponent,
    ],
    entryComponents: [
    ],
})
export class Wtf2ActionToolbarModule {
}
