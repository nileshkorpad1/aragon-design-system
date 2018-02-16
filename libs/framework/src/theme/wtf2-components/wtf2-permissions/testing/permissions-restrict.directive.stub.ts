import { Directive, EventEmitter, Input, OnInit, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { StrategyFunction } from '../service/configuration.service';

@Directive({
    selector: '[wtf2PermissionsOnly],[wtf2PermissionsExcept]',
})
export class Wtf2PermissionsRestrictStubDirective implements OnInit {

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


    constructor(private viewContainer: ViewContainerRef) {}


    ngOnInit(): void {
        this.viewContainer.clear();
        if (this.getUnAuthorizedTemplate()) {
            this.viewContainer.createEmbeddedView(this.getUnAuthorizedTemplate());
        }
        this.permissionsUnauthorized.emit();
    }


    private getUnAuthorizedTemplate() {
        return this.wtf2PermissionsOnlyElse ||
            this.wtf2PermissionsExceptElse ||
            this.wtf2PermissionsElse;
    }

}
