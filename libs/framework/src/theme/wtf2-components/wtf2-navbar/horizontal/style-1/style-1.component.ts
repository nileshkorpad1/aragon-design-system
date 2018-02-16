import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Wtf2NavigationService } from '../../../wtf2-navigation/navigation.service';
import { Wtf2SidebarService } from '../../../wtf2-sidebar/sidebar.service';

@Component({
    selector     : 'navbar-horizontal-style-1',
    templateUrl  : './style-1.component.html',
    styleUrls    : ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarHorizontalStyle1Component implements OnInit, OnDestroy
{
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {Wtf2NavigationService} _wtf2NavigationService
     * @param {Wtf2SidebarService} _wtf2SidebarService
     */
    constructor(
        private _wtf2NavigationService: Wtf2NavigationService,
        private _wtf2SidebarService: Wtf2SidebarService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get current navigation
        this._wtf2NavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._wtf2NavigationService.getCurrentNavigation();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
