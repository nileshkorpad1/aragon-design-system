import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Wtf2ConfigService } from '@wtf2/services/config.service';
import { Wtf2NavigationService } from '@wtf2/theme/wtf2-components/wtf2-navigation/navigation.service';
import { Wtf2SidebarService } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.service';
import { Wtf2SplashScreenService } from '@wtf2/services/splash-screen.service';
import { Wtf2TranslationLoaderService } from '@wtf2/services/translation-loader.service';

import { navigation } from './navigation/navigation';
import { locale as navigationChinese } from './navigation/i18n/ch';
import { locale as navigationEnglish } from './navigation/i18n/en';
export const ROOT_SELECTOR = 'app';
@Component({
    selector: ROOT_SELECTOR,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit, OnDestroy {
    wtf2Config: any;
    navigation: any;




    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {Wtf2ConfigService} _wtf2ConfigService
     * @param {Wtf2NavigationService} _wtf2NavigationService
     * @param {Wtf2SidebarService} _wtf2SidebarService
     * @param {Wtf2SplashScreenService} _wtf2SplashScreenService
     * @param {Wtf2TranslationLoaderService} _wtf2TranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _wtf2ConfigService: Wtf2ConfigService,
        private _wtf2NavigationService: Wtf2NavigationService,
        private _wtf2SidebarService: Wtf2SidebarService,
        private _wtf2SplashScreenService: Wtf2SplashScreenService,
        private _wtf2TranslationLoaderService: Wtf2TranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
    ) {
        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._wtf2NavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._wtf2NavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['ch']);
        this._translateService.addLangs(['en']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._wtf2TranslationLoaderService.loadTranslations(navigationChinese);
        this._wtf2TranslationLoaderService.loadTranslations(navigationEnglish);

        // Use a language
        this._translateService.use('ch');
        this._translateService.use('en');

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

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
            .subscribe((config) => {
                this.wtf2Config = config;
                if (this.wtf2Config.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                } else {
                    this.document.body.classList.remove('boxed');
                }
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._wtf2SidebarService.getSidebar(key).toggleOpen();
    }
    filterOptions():void{

    }
}
