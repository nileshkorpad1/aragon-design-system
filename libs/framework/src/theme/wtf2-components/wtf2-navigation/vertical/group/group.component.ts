import { Component, HostBinding, Input } from '@angular/core';

import { Wtf2NavigationItem } from '@wtf2/types';

@Component({
    selector   : 'wtf2-nav-vertical-group',
    templateUrl: './group.component.html',
    styleUrls  : ['./group.component.scss'],
})
export class Wtf2NavVerticalGroupComponent {
    @HostBinding('class')
    classes = 'nav-group nav-item';

    @Input()
    item: Wtf2NavigationItem;

    /**
     * Constructor
     */
    constructor() {
    }

}
