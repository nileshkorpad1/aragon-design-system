import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Wtf2ButtonModule, Wtf2IconModule, Wtf2MenuModule, Wtf2ToolbarModule } from '@wtf2/theme/wtf2-material';

import { Wtf2ShortcutsModule } from '../wtf2-shortcuts/shortcuts.module';
import { Wtf2SearchBarModule } from '../wtf2-search-bar/search-bar.module';
import { Wtf2CoreModule } from '../../wtf2Core.module';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
    declarations: [
        ToolbarComponent,
    ],
    imports: [
        RouterModule,
        Wtf2ButtonModule,
        Wtf2IconModule,
        Wtf2MenuModule,
        Wtf2ToolbarModule,
        Wtf2CoreModule,
        Wtf2SearchBarModule,
        Wtf2ShortcutsModule,
    ],
    exports: [
        ToolbarComponent,
    ],
})
export class ToolbarModule {
}
