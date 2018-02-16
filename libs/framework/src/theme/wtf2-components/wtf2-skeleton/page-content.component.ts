import {
    Component,
    Input,
    OnChanges,
    HostBinding,
    SimpleChanges,
    OnInit, Directive,
} from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import { Title } from '@angular/platform-browser';
@Component({
    selector: 'wtf2-page-content',
    exportAs: 'Wtf2ContentComponent',
    templateUrl: 'page-content.component.html',
    styleUrls: ['./page-content.component.scss'],
})
export class Wtf2ContentComponent implements OnInit {
    @Input() wtf2Class = '';
    @Input() cardedLayoutVar = false;
    @Input() simpleLayoutVar = false;
    @Input() cardedLeftSidebarVar = false;
    @Input() simpleLeftSidebarVar = false;
    @Input() cardedRightSidebarVar = false;
    @Input() simpleRightSidebarVar = false;
    @Input() simpleFullWidthVar = false;
    @Input() wtf2Type = 'content';
    @Input() wtf2Toolbar = '';
    @Input() isToolbar = false;
    @Input() title: string;

    @HostBinding('class')
    elementClass = 'wtf2-page-content';



    // @Input('wtf2-carded-layout')
    // set Wtf2cardedLayout(val: boolean) {
    //     this.cardedLayoutVar = convertToBoolProperty(val);

    // }
    // @Input('wtf2-simple-layout')
    // set Wtf2simpleLayout(val: boolean) {
    //     this.simpleLayoutVar = convertToBoolProperty(val);

    // }
    // @Input('wtf2-carded-leftsidebar-layout')
    // set Wtf2cardedLeftSidebarLayout(val: boolean) {
    //     this.cardedLeftSidebarVar = convertToBoolProperty(val);

    // }
    // @Input('wtf2-carded-rightsidebar-layout')
    // set Wtf2cardedRightSidebarLayout(val: boolean) {
    //     this.cardedRightSidebarVar = convertToBoolProperty(val);

    // }
    // @Input('wtf2-simple-rightsidebar-layout')
    // set Wtf2simpleRightSidebarLayout(val: boolean) {
    //     this.simpleRightSidebarVar = convertToBoolProperty(val);

    // }
    // @Input('wtf2-simple-leftsidebar-layout')
    // set Wtf2simpleLeftSidebarLayout(val: boolean) {
    //     this.simpleLeftSidebarVar = convertToBoolProperty(val);

    // }
    // @Input('wtf2-simple-fullwidth-layout')
    // set Wtf2simpleFullWidthLayout(val: boolean) {
    //     this.simpleFullWidthVar = convertToBoolProperty(val);

    // }

    constructor() {
    }
    ngOnInit() { }
}
