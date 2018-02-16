import { NgModule } from '@angular/core';
import { Wtf2ButtonModule, Wtf2IconModule } from '../../../../wtf2-material';

import { Wtf2NavigationModule } from '../../../wtf2-navigation/navigation.module';
import { Wtf2CoreModule } from '../../../../wtf2Core.module';

import { NavbarVerticalStyle1Component } from './style-1.component';

@NgModule({
    declarations: [
        NavbarVerticalStyle1Component,
    ],
    imports     : [
        Wtf2ButtonModule,
        Wtf2IconModule,

        Wtf2CoreModule,
        Wtf2NavigationModule,
    ],
    exports     : [
        NavbarVerticalStyle1Component,
    ],
})
export class NavbarVerticalStyle1Module {
}
