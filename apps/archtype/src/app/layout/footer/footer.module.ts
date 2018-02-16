import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Wtf2ButtonModule, Wtf2IconModule, Wtf2ToolbarModule } from '@wtf2/theme/wtf2-material';

import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';

import { FooterComponent } from './footer.component';

@NgModule({
    declarations: [
        FooterComponent
    ],
    imports     : [
        RouterModule,

        Wtf2ButtonModule,
        Wtf2IconModule,
        Wtf2ToolbarModule,

        Wtf2CoreModule
    ],
    exports     : [
        FooterComponent
    ]
})
export class FooterModule
{
}
