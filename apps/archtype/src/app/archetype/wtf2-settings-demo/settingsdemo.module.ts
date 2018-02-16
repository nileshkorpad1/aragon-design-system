import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsdemoComponent } from './settingsdemo.component';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ExpansionToolbarModule } from '@wtf2/theme/wtf2-components/wtf2-expansion-toolbar/wtf2-expansion-toolbar.module';
import { Wtf2InformExpanderModule } from '@wtf2/theme/wtf2-components/wtf2-inform-expander/wtf2-inform-expander.module';
import {
    PerfectScrollbarModule, PerfectScrollbarConfigInterface,
    PERFECT_SCROLLBAR_CONFIG} from '@wtf2/theme/wtf2-components/wtf2-scrollbar';
import { Wtf2DirectivesModule } from '@wtf2/theme/directives/directives';
import {Wtf2ListModule} from '@wtf2/theme/wtf2-material/list';
import { Wtf2CardModule, Wtf2FormFieldModule, Wtf2InputModule, Wtf2SelectModule, Wtf2CheckboxModule, Wtf2RadioModule } from '@wtf2/theme/wtf2-material';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    wheelPropagation: true,
};

const routes = [
    {
        path: 'settings',
        component: SettingsdemoComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        Wtf2SkeletonModule,
        Wtf2CoreModule,
        RouterModule.forChild(routes),
        Wtf2SidebarModule,
        Wtf2ExpansionToolbarModule,
        Wtf2InformExpanderModule,
        PerfectScrollbarModule,
        Wtf2DirectivesModule,
        Wtf2ListModule,
        Wtf2CardModule,
        Wtf2FormFieldModule,
        Wtf2InputModule,
        Wtf2SelectModule,
        Wtf2CheckboxModule,
        Wtf2RadioModule
    ],
    declarations: [SettingsdemoComponent],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        },
    ],
})
export class SettingsdemoModule {}
