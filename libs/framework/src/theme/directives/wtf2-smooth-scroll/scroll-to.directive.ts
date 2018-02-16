import { Directive, ViewChild, HostListener, NgModule, OnInit , AfterViewInit, Input, Injectable} from '@angular/core';
import {
    PerfectScrollbarDirective,
    PerfectScrollbarConfig,
    PerfectScrollbarConfigInterface,
    PERFECT_SCROLLBAR_CONFIG,
} from '../../../theme/wtf2-components/wtf2-scrollbar';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
};


@Directive({
    selector: '[scrollTo]',
    providers: [PerfectScrollbarDirective],
})
@Injectable()
export class ScrollToDirective {
    @Input() scrollTo: string;

    public config: PerfectScrollbarConfig;

    constructor(public directiveRef: PerfectScrollbarDirective) {}
    @HostListener('click', ['$event'])
    onclick(event: any) {
        event.target.getAttribute('scrollTo');
        document.getElementById('#' + this.scrollTo);
        document.querySelector('#' + this.scrollTo);
        this.directiveRef.scrollToDocumentElement('#' + this.scrollTo, 0, 1000);
    }
    public onScrollEvent(event: any): void {
        console.log(event);
    }
}
