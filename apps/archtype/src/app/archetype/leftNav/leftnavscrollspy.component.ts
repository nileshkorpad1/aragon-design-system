import { Component, QueryList, ViewChildren } from '@angular/core';
import { Wtf2PerfectScrollbarDirective } from '@wtf2/theme/directives/wtf2-perfect-scrollbar/wtf2-perfect-scrollbar.directive';

@Component({
    selector: 'leftnav-with-scrollspy',
    templateUrl: './leftnav.component.html',
    styleUrls: ['./leftnav.component.scss'],
})
export class leftNavwithScrollSpy {
    @ViewChildren(Wtf2PerfectScrollbarDirective)
    private _wtf2PerfectScrollbarDirectives: QueryList<Wtf2PerfectScrollbarDirective>;
    constructor() {}
    toggleSidebar() {}
}
