import { NgModule } from '@angular/core';
import {
    Wtf2ButtonModule,
    Wtf2FormFieldModule,
    Wtf2IconModule,
    Wtf2InputModule,
    Wtf2RippleModule,
    Wtf2TabsModule,
    Wtf2TooltipModule,
} from '@wtf2/theme/wtf2-material';

import { Wtf2CoreModule } from '../../wtf2Core.module';

import { Wtf2SubsideNavComponent } from './wtf2-subsidenav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
    declarations: [
        Wtf2SubsideNavComponent,
    ],
    providers: [
    ],
    imports: [
        Wtf2ButtonModule,
        Wtf2FormFieldModule,
        Wtf2IconModule,
        Wtf2InputModule,
        Wtf2TabsModule,
        Wtf2TooltipModule,
        Wtf2RippleModule,
        FontAwesomeModule,
        Wtf2CoreModule,
    ],
    exports: [
        Wtf2SubsideNavComponent,
    ],
})
export class Wtf2SubsideNavModule {
}
