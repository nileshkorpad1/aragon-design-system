import { NgModule } from '@angular/core';

import { Wtf2CoreModule } from '../../wtf2Core.module';

import { NavbarComponent } from './navbar.component';
import { NavbarHorizontalStyle1Module } from './horizontal/style-1/style-1.module';
import { NavbarVerticalStyle1Module } from './vertical/style-1/style-1.module';
import { NavbarVerticalStyle2Module } from './vertical/style-2/style-2.module';

@NgModule({
    declarations: [
        NavbarComponent,
    ],
    imports     : [
        Wtf2CoreModule,

        NavbarHorizontalStyle1Module,
        NavbarVerticalStyle1Module,
        NavbarVerticalStyle2Module,
    ],
    exports     : [
        NavbarComponent,
    ]
})
export class NavbarModule
{
}
