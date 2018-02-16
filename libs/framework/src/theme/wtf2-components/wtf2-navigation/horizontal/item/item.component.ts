import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector   : 'wtf2-nav-horizontal-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss'],
})
export class Wtf2NavHorizontalItemComponent {
    @HostBinding('class')
    classes = 'nav-item';

    @Input()
    item: any;

    /**
     * Constructor
     */
    constructor() {

    }
}
