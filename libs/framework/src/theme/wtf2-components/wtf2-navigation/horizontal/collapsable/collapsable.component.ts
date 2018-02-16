import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { wtf2Animations } from '@wtf2/theme/animations';
import { Wtf2ConfigService } from '@wtf2/services/config.service';

@Component({
    selector   : 'wtf2-nav-horizontal-collapsable',
    templateUrl: './collapsable.component.html',
    styleUrls  : ['./collapsable.component.scss'],
    animations : wtf2Animations,
})
export class Wtf2NavHorizontalCollapsableComponent implements OnInit, OnDestroy {
    wtf2Config: any;
    isOpen = false;

    @HostBinding('class')
    classes = 'nav-collapsable nav-item';

    @Input()
    item: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _wtf2ConfigService: Wtf2ConfigService,
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
        // Subscribe to config changes
        this._wtf2ConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (config) => {
                    this.wtf2Config = config;
                },
            );
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
     * Open
     */
    @HostListener('mouseenter')
    open(): void {
        this.isOpen = true;
    }

    /**
     * Close
     */
    @HostListener('mouseleave')
    close(): void {
        this.isOpen = false;
    }
}
