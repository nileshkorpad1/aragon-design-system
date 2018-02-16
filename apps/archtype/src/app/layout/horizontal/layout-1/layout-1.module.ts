import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material';

// import { FooterModule } from 'app/layout/footer/footer.module';

import { Wtf2SidebarModule, ContentModule, NavbarModule, ToolbarModule, ChatPanelModule, Wtf2SubsideNavModule } from '@wtf2/theme/wtf2-components';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';

import { HorizontalLayout1Component } from './layout-1.component';

@NgModule({
    declarations: [
        HorizontalLayout1Component,
    ],
    imports     : [
        MatSidenavModule,

        Wtf2CoreModule,
        Wtf2SidebarModule,
        // FuseThemeOptionsModule,

        ChatPanelModule,
        ContentModule,
        // FooterModule,
        NavbarModule,
        Wtf2SubsideNavModule,
        ToolbarModule,
    ],
    exports     : [
        HorizontalLayout1Component,
    ],
})
export class HorizontalLayout1Module {
}
