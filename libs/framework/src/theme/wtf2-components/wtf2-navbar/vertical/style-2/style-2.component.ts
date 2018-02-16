import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { Wtf2NavigationService } from '../../../wtf2-navigation/navigation.service';
import { Wtf2PerfectScrollbarDirective } from '../../../../directives/wtf2-perfect-scrollbar/wtf2-perfect-scrollbar.directive';
import { Wtf2SidebarService } from '../../../wtf2-sidebar/sidebar.service';

@Component({
    selector     : 'navbar-vertical-style-2',
    templateUrl  : './style-2.component.html',
    styleUrls    : ['./style-2.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle2Component implements OnInit, OnDestroy
{
    wtf2PerfectScrollbarUpdateTimeout: any;
    navigation: any;

    // Private
    private _wtf2PerfectScrollbar: Wtf2PerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {Wtf2NavigationService} _wtf2NavigationService
     * @param {Wtf2SidebarService} _wtf2SidebarService
     * @param {Router} _router
     */
    constructor(
        private _wtf2NavigationService: Wtf2NavigationService,
        private _wtf2SidebarService: Wtf2SidebarService,
        private _router: Router
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(Wtf2PerfectScrollbarDirective,{static:false})
    set directive(theDirective: Wtf2PerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
            return;
        }

        this._wtf2PerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._wtf2NavigationService.onItemCollapseToggled
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.wtf2PerfectScrollbarUpdateTimeout = window.setTimeout(() => {
                    this._wtf2PerfectScrollbar.update();
                }, 310);
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                    setTimeout(() => {
                        const activeNavItem: any = document.querySelector('navbar .nav-link.active');

                        if ( activeNavItem )
                        {
                            const activeItemOffsetTop       = activeNavItem.offsetTop,
                                  activeItemOffsetParentTop = activeNavItem.offsetParent.offsetTop,
                                  scrollDistance            = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3);

                            this._wtf2PerfectScrollbar.scrollToTop(scrollDistance);
                        }
                    });
                }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                    if ( this._wtf2SidebarService.getSidebar('navbar') )
                    {
                        this._wtf2SidebarService.getSidebar('navbar').close();
                    }
                }
            );

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
        if ( this.wtf2PerfectScrollbarUpdateTimeout )
        {
            clearTimeout(this.wtf2PerfectScrollbarUpdateTimeout);
        }

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void
    {
        this._wtf2SidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void
    {
        this._wtf2SidebarService.getSidebar('navbar').toggleFold();
    }
}
