import { NgModule } from '@angular/core';
import { Wtf2ButtonModule } from '@wtf2/theme/wtf2-material';
import {
    Wtf2ExpansionToolbarComponent,
} from './wtf2-expansion-toolbar.component';
import { Wtf2CardModule } from '@wtf2/theme/wtf2-material/card';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { CommonModule } from '@angular/common';
import { Wtf2ActionToolbarModule } from '@wtf2/theme/wtf2-components/wtf2-action-toolbar/wtf2-action-toolbar.module';
import { Wtf2DynamicAccordiongridComponent } from './wtf2-dynamic-accordiongrid.component';
import { Wtf2ExpansionToolbarModule } from '@wtf2/theme/wtf2-components/wtf2-expansion-toolbar/wtf2-expansion-toolbar.module';

import {
    // Wtf2ButtonModule,
    Wtf2IconModule,
    Wtf2FormFieldModule,
    Wtf2InputModule,
    Wtf2ListModule,
    Wtf2DatepickerModule,
    Wtf2NativeDateModule,
    Wtf2PaginatorModule,
    Wtf2SelectModule,
    Wtf2OptionModule,
    Wtf2CheckboxModule,
    Wtf2RadioModule,
    Wtf2ExpansionModule,
} from '@wtf2/theme/wtf2-material';

@NgModule({
    declarations: [
        Wtf2DynamicAccordiongridComponent,
    ],
    imports: [
        Wtf2ButtonModule,
        Wtf2CardModule,
        Wtf2CoreModule,
        CommonModule,
        Wtf2ActionToolbarModule,
        Wtf2ExpansionToolbarModule,
        Wtf2PaginatorModule,
    ],
    exports: [
        Wtf2DynamicAccordiongridComponent,
    ],
    entryComponents: [
    ],
})
export class Wtf2DynamicAccordiongridModule {
}
