import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Wtf2SidebarModule, ContentModule, NavbarModule, ToolbarModule, ChatPanelModule, Wtf2SubsideNavModule } from '@wtf2/theme/wtf2-components';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
// import { FooterModule } from 'app/layout/footer/footer.module';
import { VerticalLayout2Component } from './layout-2.component';

@NgModule({
    declarations: [
        VerticalLayout2Component,
    ],
    imports     : [
        RouterModule,

        Wtf2CoreModule,
        Wtf2SidebarModule,

        ChatPanelModule,
        ContentModule,
        // FooterModule,
        NavbarModule,
        Wtf2SubsideNavModule,
        ToolbarModule,
    ],
    exports     : [
        VerticalLayout2Component,
    ]
})
export class VerticalLayout2Module
{
}
