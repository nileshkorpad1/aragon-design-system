import { NgModule } from '@angular/core';
import { Wtf2ButtonModule } from '@wtf2/theme/wtf2-material';
import {
    Wtf2ContentToolbarComponent,
    Wtf2ContentToolbarActionPanel,
    Wtf2ContentToolbarButtonGroup,
} from './wtf2-content-toolbar.component';
import { Wtf2CardModule } from '@wtf2/theme/wtf2-material/card';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        Wtf2ContentToolbarComponent,
        Wtf2ContentToolbarActionPanel,
        Wtf2ContentToolbarButtonGroup,
    ],
    imports: [
        Wtf2ButtonModule,
        Wtf2CardModule,
        Wtf2CoreModule,
        CommonModule,
    ],
    exports: [
        Wtf2ContentToolbarComponent,
        Wtf2ContentToolbarActionPanel,
        Wtf2ContentToolbarButtonGroup,
    ],
    entryComponents: [
    ],
})
export class Wtf2ContentToolbarModule {
}
