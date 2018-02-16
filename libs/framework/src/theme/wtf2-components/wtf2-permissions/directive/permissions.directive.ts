import {
    ChangeDetectorRef,
    Directive,
    EventEmitter,
    Input, OnChanges,
    OnDestroy,
    OnInit,
    Output, SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';

import { merge, Subscription } from 'rxjs';
import { skip, take } from 'rxjs/operators';

import { Wtf2PermissionsPredefinedStrategies } from '../enums/predefined-strategies.enum';
import { Wtf2PermissionsConfigurationService, StrategyFunction } from '../service/configuration.service';
import { Wtf2PermissionsService } from '../service/permissions.service';
import { Wtf2RolesService } from '../service/roles.service';
import { isBoolean, isFunction, isString, notEmptyValue } from '../utils/utils';

@Directive({
    selector: '[wtf2PermissionsOnly],[wtf2PermissionsExcept]',
})
export class Wtf2PermissionsDirective implements OnInit, OnDestroy, OnChanges  {

    @Input() wtf2PermissionsOnly: string | string[];
    @Input() wtf2PermissionsOnlyThen: TemplateRef<any>;
    @Input() wtf2PermissionsOnlyElse: TemplateRef<any>;

    @Input() wtf2PermissionsExcept: string | string[];
    @Input() wtf2PermissionsExceptElse: TemplateRef<any>;
    @Input() wtf2PermissionsExceptThen: TemplateRef<any>;

    @Input() wtf2PermissionsThen: TemplateRef<any>;
    @Input() wtf2PermissionsElse: TemplateRef<any>;

    @Input() wtf2PermissionsOnlyAuthorisedStrategy: string | StrategyFunction;
    @Input() wtf2PermissionsOnlyUnauthorisedStrategy: string | StrategyFunction;

    @Input() wtf2PermissionsExceptUnauthorisedStrategy: string | StrategyFunction;
    @Input() wtf2PermissionsExceptAuthorisedStrategy: string | StrategyFunction;

    @Input() wtf2PermissionsUnauthorisedStrategy: string | StrategyFunction;
    @Input() wtf2PermissionsAuthorisedStrategy: string | StrategyFunction;

    @Output() permissionsAuthorized = new EventEmitter();
    @Output() permissionsUnauthorized = new EventEmitter();

    private initPermissionSubscription: Subscription;
    // skip first run cause merge will fire twice
    private firstMergeUnusedRun = 1;
    private currentAuthorizedState: boolean;

    constructor(
        private permissionsService: Wtf2PermissionsService,
        private configurationService: Wtf2PermissionsConfigurationService,
        private rolesService: Wtf2RolesService,
        private viewContainer: ViewContainerRef,
        private changeDetector: ChangeDetectorRef,
        private templateRef: TemplateRef<any>,
    ) {
    }

    ngOnInit(): void {
        this.viewContainer.clear();
        this.initPermissionSubscription = this.validateExceptOnlyPermissions();
    }


    ngOnChanges(changes: SimpleChanges): void {
        const onlyChanges = changes['wtf2PermissionsOnly'];
        const exceptChanges = changes['wtf2PermissionsExcept'];
        if (onlyChanges || exceptChanges) {
            // Due to bug when you pass empty array
            if (onlyChanges && onlyChanges.firstChange) { return; }
            if (exceptChanges && exceptChanges.firstChange) { return; }

            merge(this.permissionsService.permissions$, this.rolesService.roles$)
                .pipe(skip(this.firstMergeUnusedRun), take(1))
                .subscribe(() => {
                    if (notEmptyValue(this.wtf2PermissionsExcept)) {
                        this.validateExceptAndOnlyPermissions();
                        return;
                    }

                    if (notEmptyValue(this.wtf2PermissionsOnly)) {
                        this.validateOnlyPermissions();
                        return;
                    }

                    this.handleAuthorisedPermission(this.getAuthorisedTemplates());
                });
        }
    }

    ngOnDestroy(): void {
        if (this.initPermissionSubscription) {
            this.initPermissionSubscription.unsubscribe();
        }
    }

    private validateExceptOnlyPermissions(): Subscription {
        return merge(this.permissionsService.permissions$, this.rolesService.roles$)
            .pipe(skip(this.firstMergeUnusedRun))
            .subscribe(() => {
                if (notEmptyValue(this.wtf2PermissionsExcept)) {
                    this.validateExceptAndOnlyPermissions();
                    return;
                }

                if (notEmptyValue(this.wtf2PermissionsOnly)) {
                    this.validateOnlyPermissions();
                    return;
                }
                this.handleAuthorisedPermission(this.getAuthorisedTemplates());
            });
    }

    private validateExceptAndOnlyPermissions(): void {
        Promise.all([this.permissionsService.hasPermission(this.wtf2PermissionsExcept), this.rolesService.hasOnlyRoles(this.wtf2PermissionsExcept)])
            .then(([hasPermission, hasRole]) => {
                if (hasPermission || hasRole) {
                    this.handleUnauthorisedPermission(this.wtf2PermissionsExceptElse || this.wtf2PermissionsElse);
                    return;
                }

                if (!!this.wtf2PermissionsOnly) {  throw false; }

                this.handleAuthorisedPermission(this.wtf2PermissionsExceptThen || this.wtf2PermissionsThen || this.templateRef);

            }).catch(() => {
                if (!!this.wtf2PermissionsOnly) {
                    this.validateOnlyPermissions();
                } else {
                    this.handleAuthorisedPermission(this.wtf2PermissionsExceptThen || this.wtf2PermissionsThen || this.templateRef);
                }
        });
    }

    private validateOnlyPermissions(): void {
        Promise.all([this.permissionsService.hasPermission(this.wtf2PermissionsOnly), this.rolesService.hasOnlyRoles(this.wtf2PermissionsOnly)])
            .then(([hasPermissions, hasRoles]) => {
                if (hasPermissions || hasRoles) {
                    this.handleAuthorisedPermission(this.wtf2PermissionsOnlyThen || this.wtf2PermissionsThen || this.templateRef);
                } else {
                    this.handleUnauthorisedPermission(this.wtf2PermissionsOnlyElse || this.wtf2PermissionsElse);
                }
            }).catch(() => {
                this.handleUnauthorisedPermission(this.wtf2PermissionsOnlyElse || this.wtf2PermissionsElse);
        });
    }

    private handleUnauthorisedPermission(template: TemplateRef<any>): void {
        if (isBoolean(this.currentAuthorizedState) && !this.currentAuthorizedState) { return; }

        this.currentAuthorizedState = false;
        this.permissionsUnauthorized.emit();

        if (this.getUnAuthorizedStrategyInput()) {
            this.applyStrategyAccordingToStrategyType(this.getUnAuthorizedStrategyInput());
            return;
        }

        if (this.configurationService.onUnAuthorisedDefaultStrategy && !this.elseBlockDefined()) {
            this.applyStrategy(this.configurationService.onUnAuthorisedDefaultStrategy);
        } else {
            this.showTemplateBlockInView(template);
        }

    }

    private handleAuthorisedPermission(template: TemplateRef<any>): void {
        if (isBoolean(this.currentAuthorizedState) && this.currentAuthorizedState) { return; }

        this.currentAuthorizedState = true;
        this.permissionsAuthorized.emit();

        if (this.getAuthorizedStrategyInput()) {
            this.applyStrategyAccordingToStrategyType(this.getAuthorizedStrategyInput());
            return;
        }

        if (this.configurationService.onAuthorisedDefaultStrategy && !this.thenBlockDefined()) {
            this.applyStrategy(this.configurationService.onAuthorisedDefaultStrategy);
        } else {
            this.showTemplateBlockInView(template);
        }
    }

    private applyStrategyAccordingToStrategyType(strategy: string | Function): void {
        if (isString(strategy)) {
            this.applyStrategy(strategy);
            return;
        }

        if (isFunction(strategy)) {
            this.showTemplateBlockInView(this.templateRef);
            (strategy as Function)(this.templateRef);
            return;
        }
    }

    private showTemplateBlockInView(template: TemplateRef<any>): void {
        this.viewContainer.clear();
        if (!template) {
            return;
        }

        this.viewContainer.createEmbeddedView(template);
        this.changeDetector.markForCheck();
    }

    private getAuthorisedTemplates(): TemplateRef<any> {
        return this.wtf2PermissionsOnlyThen
            || this.wtf2PermissionsExceptThen
            || this.wtf2PermissionsThen
            || this.templateRef;
    }

    private elseBlockDefined(): boolean {
        return !!this.wtf2PermissionsExceptElse || !!this.wtf2PermissionsElse;
    }

    private thenBlockDefined() {
        return !!this.wtf2PermissionsExceptThen || !!this.wtf2PermissionsThen;
    }

    private getAuthorizedStrategyInput() {
        return this.wtf2PermissionsOnlyAuthorisedStrategy ||
            this.wtf2PermissionsExceptAuthorisedStrategy ||
            this.wtf2PermissionsAuthorisedStrategy;
    }

    private getUnAuthorizedStrategyInput() {
        return this.wtf2PermissionsOnlyUnauthorisedStrategy ||
            this.wtf2PermissionsExceptUnauthorisedStrategy ||
            this.wtf2PermissionsUnauthorisedStrategy;
    }

    private applyStrategy(str: any) {
        if (str === Wtf2PermissionsPredefinedStrategies.SHOW) {
            this.showTemplateBlockInView(this.templateRef);
            return;
        }

        if (str === Wtf2PermissionsPredefinedStrategies.REMOVE) {
            this.viewContainer.clear();
            return;
        }
        const strategy = this.configurationService.getStrategy(str);
        this.showTemplateBlockInView(this.templateRef);
        strategy(this.templateRef);
    }
}
