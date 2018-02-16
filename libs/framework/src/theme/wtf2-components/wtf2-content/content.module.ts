import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Wtf2CoreModule } from '../../wtf2Core.module';

import { ContentComponent } from './content.component';

@NgModule({
    declarations: [
        ContentComponent,
    ],
    imports: [
        RouterModule,
        Wtf2CoreModule,
    ],
    exports: [
        ContentComponent,
    ],
})
export class ContentModule {
}
