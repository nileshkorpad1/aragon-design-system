import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// import { FooterModule } from 'app/layout/footer/footer.module';

import { Wtf2SidebarModule, ContentModule, NavbarModule, ToolbarModule, ChatPanelModule, Wtf2SubsideNavModule } from '@wtf2/theme/wtf2-components';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';

import { VerticalLayout1Component } from './layout-1.component';

@NgModule({
    declarations: [
        VerticalLayout1Component,
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
        VerticalLayout1Component,
    ],
})
export class VerticalLayout1Module {
}
