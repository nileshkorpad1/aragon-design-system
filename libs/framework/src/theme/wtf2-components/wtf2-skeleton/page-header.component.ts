import {
    Component,
    Input,
    Directive,
    OnInit,
    HostBinding,
    OnDestroy,
} from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import { Wtf2ConfigService } from '@wtf2/services/config.service';
import { Subject } from 'rxjs';
import { takeUntil, reduce } from 'rxjs/operators';
import { navigation } from '../../navigation/navigation';
@Component({
    selector: 'wtf2-page-header',
    exportAs: 'Wtf2PageHeaderComponent',
    templateUrl: 'page-header.component.html',
  styles: ['.wtf2-header-panel { padding-bottom:48px; }'],
})
export class Wtf2PageHeaderComponent implements OnInit , OnDestroy {
    @HostBinding('class')
    elementClass = '';
    @Input() wtf2Class = '';
    @Input() title = '';

    wtf2Config: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param   {Wtf2ConfigService} _wtf2ConfigService
     */
    constructor(private _wtf2ConfigService: Wtf2ConfigService) {
        // Set the defaults
        this.navigation = navigation;

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
            .subscribe(config => {
                this.wtf2Config = config;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
@Directive({
    selector: 'wtf2-header-title,[wtf2-header-title],.wtf2-header-title',
    host: {
        class: 'wtf2-page-header-title',
    },
})
export class Wtf2PageHeaderTitle implements OnInit {
    ngOnInit() {}
}

@Directive({
    selector:
        'wtf2-header-subtitle,[wtf2-header-subtitle],.wtf2-header-subtitle',
    host: {
        class: 'wtf2-page-header-subtitle',
    },
})
export class Wtf2PageHeaderSubtitle implements OnInit {
    ngOnInit() {}
}
