import { NgModule } from '@angular/core';
import { Wtf2ButtonModule, Wtf2IconModule } from '@wtf2/theme/wtf2-material';
import {
    Wtf2ExpansionToolbarComponent,
} from './wtf2-expansion-toolbar.component';
import { Wtf2CardModule } from '@wtf2/theme/wtf2-material/card';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { CommonModule } from '@angular/common';
import { Wtf2SearchBarModule } from '../wtf2-search-bar/search-bar.module';
import { Wtf2ActionToolbarModule } from '@wtf2/theme/wtf2-components/wtf2-action-toolbar/wtf2-action-toolbar.module';
import { Wtf2SplitButtonModule } from '@wtf2/theme/wtf2-components/wtf2-split-button/wtf2-split-button.module';
import { Wtf2MenuModule } from '@wtf2/theme/wtf2-material/menu';
@NgModule({
    declarations: [
        Wtf2ExpansionToolbarComponent,
    ],
    imports: [
        Wtf2ButtonModule,
        Wtf2CardModule,
        Wtf2CoreModule,
        CommonModule,
        Wtf2ActionToolbarModule,
        Wtf2SearchBarModule,
        Wtf2SplitButtonModule,
        Wtf2MenuModule,
        Wtf2IconModule,
    ],
    exports: [
        Wtf2ExpansionToolbarComponent,
    ],
    entryComponents: [
    ],
})
export class Wtf2ExpansionToolbarModule {
}
