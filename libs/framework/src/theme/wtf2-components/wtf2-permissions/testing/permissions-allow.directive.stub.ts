import { Directive, EventEmitter, Input, OnInit, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { StrategyFunction } from '../service/configuration.service';

@Directive({
    selector: '[wtf2PermissionsOnly],[wtf2PermissionsExcept]',
})
export class Wtf2PermissionsAllowStubDirective implements OnInit {

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


    constructor(private viewContainer: ViewContainerRef,
                private templateRef: TemplateRef<any>) {}


    ngOnInit(): void {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.getAuthorizedTemplate());
        this.permissionsUnauthorized.emit();
    }


    private getAuthorizedTemplate() {
        return this.wtf2PermissionsOnlyThen ||
            this.wtf2PermissionsExceptThen ||
            this.wtf2PermissionsThen ||
            this.templateRef;
    }

}
