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

import { ChatPanelComponent } from './chat-panel.component';
import { ChatPanelService } from './chat-panel.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
    declarations: [
        ChatPanelComponent,
    ],
    providers: [
        ChatPanelService,
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
        ChatPanelComponent,
    ],
})
export class ChatPanelModule {
}
