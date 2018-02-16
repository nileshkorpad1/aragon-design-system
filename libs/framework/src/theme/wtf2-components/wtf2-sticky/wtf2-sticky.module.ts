import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StickyHeaderComponent } from './wtf2-sticky.component';
// import { Wtf2CoreModule } from '../../wtf2Core.module';

@NgModule({
    imports: [
        CommonModule,
        // Wtf2CoreModule,
    ],
    declarations: [
        StickyHeaderComponent,
    ],
    exports: [
        StickyHeaderComponent,
    ],

})

export class Wtf2StickyModule { }
