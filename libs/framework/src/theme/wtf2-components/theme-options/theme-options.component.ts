import { Component, HostBinding, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { wtf2Animations } from '../../animations';
import { Wtf2ConfigService } from '../../../services/config.service';
import { Wtf2NavigationService } from '../wtf2-navigation/navigation.service';
import { Wtf2SidebarService } from '../wtf2-sidebar/sidebar.service';

@Component({
    selector   : 'wtf2-theme-options',
    templateUrl: './theme-options.component.html',
    styleUrls  : ['./theme-options.component.scss'],
    animations : wtf2Animations,
})
export class Wtf2ThemeOptionsComponent implements OnInit, OnDestroy
{
    wtf2Config: any;
    form: FormGroup;

    @HostBinding('class.bar-closed')
    barClosed: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {Wtf2ConfigService} _wtf2ConfigService
     * @param {Wtf2NavigationService} _wtf2NavigationService
     * @param {Wtf2SidebarService} _wtf2SidebarService
     * @param {Renderer2} _renderer
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _wtf2ConfigService: Wtf2ConfigService,
        private _wtf2NavigationService: Wtf2NavigationService,
        private _wtf2SidebarService: Wtf2SidebarService,
        private _renderer: Renderer2,
    ) {
        // Set the defaults
        this.barClosed = true;

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
        // Build the config form
        // noinspection TypeScriptValidateTypes
        // this.wtf2Config.='default';
        this.form = this._formBuilder.group({
            layout: this._formBuilder.group({
                style: new FormControl(),
                width: new FormControl(),
                navbar: this._formBuilder.group({
                    background: new FormControl(),
                    folded: new FormControl(),
                    hidden: new FormControl(),
                    position: new FormControl(),
                    variant: new FormControl()
                }),
                toolbar: this._formBuilder.group({
                    background: new FormControl(),
                    hidden: new FormControl(),
                    position: new FormControl()
                }),
                footer: this._formBuilder.group({
                    background: new FormControl(),
                    hidden: new FormControl(),
                    position: new FormControl()
                }),
                sidepanel: this._formBuilder.group({
                    hidden: new FormControl(),
                    position: new FormControl()
                })
            }),
            wtf2theme: new FormControl(),
            globleSearch : new FormControl(),
            customScrollbars: new FormControl()
        });

        // Subscribe to the config changes
        this._wtf2ConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                // Update the stored config
                this.wtf2Config = config;
                //this.wtf2Config.wtf2theme = 'default';

                // Set the config form values without emitting an event
                // so that we don't end up with an infinite loop
                this.form.setValue(config, {emitEvent: false});
            });

        // Subscribe to the specific form value changes (layout.style)
        this.form.get('layout.style').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) => {

                // Reset the form values based on the
                // selected layout style
                this._resetFormValues(value);

            });

        // Subscribe to the form value changes
        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                // Update the config
                this._wtf2ConfigService.config = config;
            });

        // Add customize nav item that opens the bar programmatically
        const customFunctionNavItem = {
            // 'id'      : 'custom-function',
            // 'title'   : 'Custom Function',
            // 'type'    : 'group',
            // 'icon'    : 'settings',
            // 'children': [
            //     {
            //         'id'      : 'customize',
            //         'title'   : 'Customize',
            //         'type'    : 'item',
            //         'icon'    : 'settings',
            //         'function': () => {
            //             this.toggleSidebarOpen('themeOptionsPanel');
            //         }
            //     },
            // ]
        };

        this._wtf2NavigationService.addNavigationItem(customFunctionNavItem, 'end');
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        // Remove the custom function menu
        this._wtf2NavigationService.removeNavigationItem('custom-function');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset the form values based on the
     * selected layout style
     *
     * @param value
     * @private
     */
    private _resetFormValues(value): void
    {
        switch ( value )
        {
            // Vertical Layout #1
            case 'default':
            {
                this.form.patchValue({
                    layout: {
                        width  : 'fullwidth',
                        navbar : {
                            background: '',
                            folded    : false,
                            hidden    : false,
                            position  : 'left',
                            variant   : 'vertical-style-2',
                        },
                        toolbar: {
                            background: '',
                            hidden    : false,
                            position  : 'below-static',
                        },
                        footer : {
                            background: '',
                            hidden    : false,
                            position  : 'below-static',
                        },
                        sidepannel : {
                            hidden    : false,
                            position: 'left',
                        },
                    },
                    theme: 'default',
                });

                break;
            }

            // Vertical Layout #2
            // case 'vertical-layout-2':
            // {
            //     this.form.patchValue({
            //         layout: {
            //             width  : 'fullwidth',
            //             navbar : {
            //                 background: 'wtf2-dark-700-bg',
            //                 folded    : false,
            //                 hidden    : false,
            //                 position  : 'left',
            //                 variant   : 'vertical-style-1',
            //             },
            //             toolbar: {
            //                 background: 'wtf2-white-500-bg',
            //                 hidden    : false,
            //                 position  : 'below',
            //             },
            //             footer : {
            //                 background: 'wtf2-dark-900-bg',
            //                 hidden    : false,
            //                 position  : 'below',
            //             },
            //         },
            //     });

            //     break;
            // }

            // Vertical Layout #3
            case 'warmwhite':
            {
                this.form.patchValue({
                    layout: {
                        width: 'fullwidth',
                        navbar: {
                            background: '',
                            folded: false,
                            hidden: false,
                            position: 'left',
                            variant: 'vertical-style-2',
                        },
                        toolbar: {
                            background: '',
                            hidden: false,
                            position: 'below-static',
                        },
                        footer: {
                            background: '',
                            hidden: false,
                            position: 'below-static',
                        },
                        sidepannel: {
                            hidden: false,
                            position: 'left',
                        },
                    },
                    theme: 'warmwhite',
                });

                break;
            }

            // Horizontal Layout #1
            // case 'horizontal-layout-1':
            // {
            //     this.form.patchValue({
            //         layout: {
            //             width  : 'fullwidth',
            //             navbar : {
            //                 background: 'wtf2-dark-700-bg',
            //                 folded    : false,
            //                 hidden    : false,
            //                 position  : 'top',
            //                 variant   : 'vertical-style-1'
            //             },
            //             toolbar: {
            //                 background: 'wtf2-white-500-bg',
            //                 hidden    : false,
            //                 position  : 'above'
            //             },
            //             footer : {
            //                 background: 'wtf2-dark-900-bg',
            //                 hidden    : false,
            //                 position  : 'above-fixed'
            //             }
            //         }
            //     });

            //     break;
            // }
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._wtf2SidebarService.getSidebar(key).toggleOpen();
    }

    themeChange(theme){
        this.wtf2Config.wtf2theme = theme;
        this._wtf2ConfigService.defaultConfig.wtf2theme = theme;
    }

}
