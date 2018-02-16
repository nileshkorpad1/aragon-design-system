import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Wtf2NavigationService } from './navigation.service';

@Component({
    selector: 'wtf2-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class Wtf2NavigationComponent implements OnInit {
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private _wtf2NavigationService: Wtf2NavigationService,
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
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._wtf2NavigationService.getCurrentNavigation();

        // Subscribe to the current navigation changes
        this._wtf2NavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.navigation = this._wtf2NavigationService.getCurrentNavigation();
            });
    }
}
