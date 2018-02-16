import { NgModule } from '@angular/core';
import { Wtf2ButtonModule, Wtf2IconModule } from '../../../../wtf2-material';

import { Wtf2NavigationModule } from '../../../wtf2-navigation/navigation.module';
import { Wtf2CoreModule } from '../../../../wtf2Core.module';

import { NavbarHorizontalStyle1Component } from './style-1.component';

@NgModule({
    declarations: [
        NavbarHorizontalStyle1Component,
    ],
    imports     : [
        Wtf2ButtonModule,
        Wtf2IconModule,

        Wtf2CoreModule,
        Wtf2NavigationModule,
    ],
    exports     : [
        NavbarHorizontalStyle1Component,
    ],
})
export class NavbarHorizontalStyle1Module {
}
