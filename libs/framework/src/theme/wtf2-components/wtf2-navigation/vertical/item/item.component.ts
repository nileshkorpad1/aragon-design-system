import { Component, HostBinding, Input } from '@angular/core';

import { Wtf2NavigationItem } from '@wtf2/types';

@Component({
    selector   : 'wtf2-nav-vertical-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss'],
})
export class Wtf2NavVerticalItemComponent {
    @HostBinding('class')
    classes = 'nav-item';

    @Input()
    item: Wtf2NavigationItem;

    /**
     * Constructor
     */
    constructor() {
    }
}
