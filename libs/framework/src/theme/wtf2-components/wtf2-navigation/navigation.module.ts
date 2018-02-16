import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Wtf2IconModule, Wtf2RippleModule } from '@wtf2/theme/wtf2-material';

import { TranslateModule } from '@ngx-translate/core';

import { Wtf2NavigationComponent } from './navigation.component';
import { Wtf2NavVerticalItemComponent } from './vertical/item/item.component';
import { Wtf2NavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { Wtf2NavVerticalGroupComponent } from './vertical/group/group.component';
import { Wtf2NavHorizontalItemComponent } from './horizontal/item/item.component';
import { Wtf2NavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,

        Wtf2IconModule,
        Wtf2RippleModule,

        TranslateModule.forChild(),
    ],
    exports: [
        Wtf2NavigationComponent,
    ],
    declarations: [
        Wtf2NavigationComponent,
        Wtf2NavVerticalGroupComponent,
        Wtf2NavVerticalItemComponent,
        Wtf2NavVerticalCollapsableComponent,
        Wtf2NavHorizontalItemComponent,
        Wtf2NavHorizontalCollapsableComponent,
    ],
})
export class Wtf2NavigationModule {
}
