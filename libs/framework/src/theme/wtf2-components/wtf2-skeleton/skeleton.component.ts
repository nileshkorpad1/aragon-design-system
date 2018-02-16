import {
    Component,
    Input,
    ViewEncapsulation,
    ElementRef,
    OnDestroy,
    OnInit,
    Renderer2,
    HostBinding,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Wtf2SidebarService } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.service';
import { convertToBoolProperty } from '../helpers';
import { Wtf2MatchMediaService } from '@wtf2/services/match-media.service';
import { Wtf2ConfigService } from '@wtf2/services/config.service';
import { navigation } from '../../navigation/navigation';
@Component({
    selector: '[wtf2_page_skeleton],wtf2-page-skeleton',
    exportAs: 'Wtf2SkeletonComponent',
    templateUrl: 'skeleton.component.html',
    styleUrls: ['./skeleton.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class Wtf2SkeletonComponent implements OnInit, OnDestroy {
    protected _elementClass: string[] = [];
    // @Input() cardedValue = false;
    childTitle: string = 'This text is passed to child';

    @Input() simpleValue = false;
    @Input() bgColor = 'wtf2-grey-100-bg';
    @Input() fullwidthValue = false;
    @Input() cardedValue = false;
    @Input() leftSideBarValue = false;
    @Input() rightSideBarValue = false;
    @Input() innerScrollValue = false;
    @Input() actiontoolbarValue = false;

    wtf2Config: any;
    navigation: any;

    private _simple_sidebar_pagecontent = false;
    // Iner scroll
    private _parent: any;
    private _grandParent: any;
    private _unsubscribeAll: Subject<any>;

    @HostBinding('class.color') carded: string;

    @Input('class')
    @HostBinding('class')
    get elementClass(): string {
        return this._elementClass.join(' ');
    }
    set(val: string) {
        this._elementClass = val.split(' ');
    }


    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {Wtf2MatchMediaService} _wtf2MediaMatchService
     * @param {Renderer2} _renderer
     *  @param   {Wtf2ConfigService} _wtf2ConfigService
     */
    constructor(
        private _elementRef: ElementRef,
        private _wtf2MediaMatchService: Wtf2MatchMediaService,
        private _renderer: Renderer2,
        private _wtf2SidebarService: Wtf2SidebarService,
        private _wtf2ConfigService: Wtf2ConfigService,
    ) {
        this._elementClass.push('mx-auto');
        this._elementClass.push('page-layout');

        // Set the private defaults
        this.navigation = navigation;
        this._unsubscribeAll = new Subject();
    }


    @Input('fullwidth')
    set setFullwidth(val: boolean) {
        this.fullwidthValue = convertToBoolProperty(val);
    }
    @Input('left_sidebar')
    set setLeftSidebar(val: boolean) {
        this.leftSideBarValue = convertToBoolProperty(val);
    }
    @Input('right_sidebar')
    set setRightSidebar(val: boolean) {
        this.rightSideBarValue = convertToBoolProperty(val);
    }
    @Input('innerScroll')
    set setInnerScroll(val: boolean) {
        this.innerScrollValue = convertToBoolProperty(val);
    }
    @Input('simple')
    set setSimple(val: boolean) {
        this.simpleValue = convertToBoolProperty(val);
        // this.cardedValue = false;
    }
    @Input('carded')
    set setCarded(val: boolean) {
        this.cardedValue = convertToBoolProperty(val);
        // this.cardedValue = false;
    }
    @Input('actiontoolbar')
    set setActiontoolbar(val: boolean) {
        this.actiontoolbarValue = convertToBoolProperty(val);
        // this.cardedValue = false;
    }
    ngOnInit(): void {
        // this._wtf2ConfigService.config
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(config => {
        //         this.wtf2Config = config;
        //     });
        if (this.simpleValue) {
            this._elementClass.push('simple');
        }
        if (this.fullwidthValue) {
            this._elementClass.push('fullwidth');
        }
        if (this.rightSideBarValue) {
            this._elementClass.push('right_sidebar');
        }
        if (this.leftSideBarValue) {
            this._elementClass.push('left_sidebar');
        }
        if (this.cardedValue) {
            this._elementClass.push('carded');
        }
        if (this.innerScrollValue) {
            this._parent = this._renderer.parentNode(this._elementRef.nativeElement);

            // Return, if there is no parent
            if (!this._parent) {
                return;
            }
            // Get the grand parent
            this._grandParent = this._renderer.parentNode(this._parent);
            // this._renderer.removeChild(this._parent, this._elementRef.nativeElement);
            // Register to the media query changes
            this._wtf2MediaMatchService.onMediaChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((alias) => {

                    if (alias === 'xs') {
                        this._removeClass();
                    } else {
                        this._addClass();
                    }
                });

        }
    }
    toggleSidebarOpen(key): void {
        this._wtf2SidebarService.getSidebar(key).toggleOpen();
    }


    /**
     * On destroy
     */
    ngOnDestroy(): void {

        if (this.innerScrollValue) {
            // Return, if there is no parent
            if (!this._parent) {
                return;
            }

            // Remove the class
            this._removeClass();

            // Unsubscribe from all subscriptions
            this._unsubscribeAll.next();
            this._unsubscribeAll.complete();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Add the class name
     *
     * @private
     */
    private _addClass(): void {

        // Add the inner-scroll class
        this._renderer.addClass(this._grandParent, 'inner-scroll');
    }

    /**
     * Remove the class name
     * @private
     */
    private _removeClass(): void {

        // Remove the inner-scroll class
        this._renderer.removeClass(this._grandParent, 'inner-scroll');
    }
}