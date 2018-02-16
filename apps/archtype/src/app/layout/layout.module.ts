import { NgModule } from '@angular/core';

import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { VerticalLayout1Module } from './vertical/layout-1/layout-1.module';
import { VerticalLayout2Module } from './vertical/layout-2/layout-2.module';
import { VerticalLayout3Module } from './vertical/layout-3/layout-3.module';
import { HorizontalLayout1Module } from './horizontal/layout-1/layout-1.module';
@NgModule({
    imports: [
        Wtf2CoreModule,
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,
        HorizontalLayout1Module
    ],
    exports: [
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,

        HorizontalLayout1Module
    ]
})
export class LayoutModule
{
}
