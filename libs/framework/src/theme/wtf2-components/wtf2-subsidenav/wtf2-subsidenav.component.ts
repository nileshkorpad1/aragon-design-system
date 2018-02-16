import {
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Wtf2SidebarService } from '../wtf2-sidebar/sidebar.service';
import { Wtf2PerfectScrollbarDirective } from '../../directives/wtf2-perfect-scrollbar/wtf2-perfect-scrollbar.directive';
import { faPaperclip, faStar, faUser, faThLarge, faAppleAlt, faCarBattery, faAnkh, faBasketballBall } from '@fortawesome/free-solid-svg-icons';

export interface imageList {
    title: string;
    url: string;
}


@Component({
    selector: 'wtf2-subsidenav',
    templateUrl: './wtf2-subsidenav.component.html',
    styleUrls: ['./wtf2-subsidenav.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class Wtf2SubsideNavComponent implements OnInit {
    contacts: any[];
    chat: any;
    selectedContact: any;
    sidebarFolded: boolean;
    user: any;
    faPaperclip = faPaperclip;
    faStar = faStar;
    faUser = faUser;
    faThLarge = faThLarge;
    faAppleAlt = faAppleAlt;
    faCarBattery = faCarBattery;
    faAnkh = faAnkh;
    faBasketballBall = faBasketballBall;
    imageList: imageList[] = [
        { title: "ERP", url: "assets/images/erp-icon.png" },
        { title: "CRM", url: "assets/images/crm-icon.png" },
        { title: "PM", url: "assets/images/pm-icon.png" },
        { title: "HRMS", url: "assets/images/hrms-icon.png" },
        { title: "EL", url: "assets/images/e-leave-icon.png" },
        { title: "EC", url: "assets/images/e-claims-icon.png" },
    ];

    @ViewChildren(Wtf2PerfectScrollbarDirective)
    private _wtf2PerfectScrollbarDirectives: QueryList<Wtf2PerfectScrollbarDirective>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {Wtf2SidebarService} _wtf2SidebarService
     */
    constructor(
        private _wtf2SidebarService: Wtf2SidebarService,
    ) {
        // Set the defaults
        this.selectedContact = null;
        this.sidebarFolded = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Load the contacts
        // Subscribe to the foldedChanged observable
        this._wtf2SidebarService.getSidebar('chatPanel').foldedChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((folded) => {
                this.sidebarFolded = folded;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fold the temporarily unfolded sidebar back
     */
    foldSidebarTemporarily(): void {
        this._wtf2SidebarService.getSidebar('chatPanel').foldTemporarily();
    }

    /**
     * Unfold the sidebar temporarily
     */
    unfoldSidebarTemporarily(): void {
        this._wtf2SidebarService.getSidebar('chatPanel').unfoldTemporarily();
    }

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpen(): void {
        this._wtf2SidebarService.getSidebar('chatPanel').toggleOpen();
    }

}
