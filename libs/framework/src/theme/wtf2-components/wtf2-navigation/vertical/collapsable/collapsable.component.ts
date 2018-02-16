import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { Wtf2NavigationItem } from '@wtf2/types';
import { wtf2Animations } from '@wtf2/theme/animations';
import { Wtf2NavigationService } from '@wtf2/theme/wtf2-components/wtf2-navigation/navigation.service';

@Component({
    selector   : 'wtf2-nav-vertical-collapsable',
    templateUrl: './collapsable.component.html',
    styleUrls  : ['./collapsable.component.scss'],
    animations : wtf2Animations,
})
export class Wtf2NavVerticalCollapsableComponent implements OnInit, OnDestroy {
    @Input()
    item: Wtf2NavigationItem;

    @HostBinding('class')
    classes = 'nav-collapsable nav-item';

    @HostBinding('class.open')
    public isOpen = false;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {Wtf2NavigationService} _wtf2NavigationService
     * @param {Router} _router
     */
    constructor(
        private _wtf2NavigationService: Wtf2NavigationService,
        private _router: Router,
    ) {
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
        // Listen for router events
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((event: NavigationEnd) => {

                // Check if the url can be found in
                // one of the children of this item
                if ( this.isUrlInChildren(this.item, event.urlAfterRedirects) ) {
                    this.expand();
                } else {
                    this.collapse();
                }
            });

        // Listen for collapsing of any navigation item
        this._wtf2NavigationService.onItemCollapsed
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (clickedItem) => {
                    if ( clickedItem && clickedItem.children ) {
                        // Check if the clicked item is one
                        // of the children of this item
                        if ( this.isChildrenOf(this.item, clickedItem) ) {
                            return;
                        }

                        // Check if the url can be found in
                        // one of the children of this item
                        if ( this.isUrlInChildren(this.item, this._router.url) ) {
                            return;
                        }

                        // If the clicked item is not this item, collapse...
                        if ( this.item !== clickedItem ) {
                            this.collapse();
                        }
                    }
                },
            );

        // Check if the url can be found in
        // one of the children of this item
        if ( this.isUrlInChildren(this.item, this._router.url) ) {
            this.expand();
        } else {
            this.collapse();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle collapse
     *
     * @param ev
     */
    toggleOpen(ev): void {
        ev.preventDefault();

        this.isOpen = !this.isOpen;

        // Navigation collapse toggled...
        this._wtf2NavigationService.onItemCollapsed.next(this.item);
        this._wtf2NavigationService.onItemCollapseToggled.next();
    }

    /**
     * Expand the collapsable navigation
     */
    expand(): void {
        if ( this.isOpen ) {
            return;
        }

        this.isOpen = true;
        this._wtf2NavigationService.onItemCollapseToggled.next();
    }

    /**
     * Collapse the collapsable navigation
     */
    collapse(): void {
        if ( !this.isOpen ) {
            return;
        }

        this.isOpen = false;
        this._wtf2NavigationService.onItemCollapseToggled.next();
    }

    /**
     * Check if the given parent has the
     * given item in one of its children
     *
     * @param parent
     * @param item
     * @returns {boolean}
     */
    isChildrenOf(parent, item): boolean {
        if ( !parent.children ) {
            return false;
        }

        if ( parent.children.indexOf(item) !== -1 ) {
            return true;
        }

        for ( const children of parent.children ) {
            if ( children.children ) {
                return this.isChildrenOf(children, item);
            }
        }
    }

    /**
     * Check if the given url can be found
     * in one of the given parent's children
     *
     * @param parent
     * @param url
     * @returns {boolean}
     */
    isUrlInChildren(parent, url): boolean {
        if ( !parent.children ) {
            return false;
        }

        for ( let i = 0; i < parent.children.length; i++ ) {
            if ( parent.children[i].children ) {
                if ( this.isUrlInChildren(parent.children[i], url) ) {
                    return true;
                }
            }

            if ( parent.children[i].url === url || url.includes(parent.children[i].url) ) {
                return true;
            }
        }

        return false;
    }

}
