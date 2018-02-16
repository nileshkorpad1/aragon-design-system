import { OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Wtf2AccessChecker } from '../services/access-checker.service';
export declare class Wtf2IsGrantedDirective implements OnDestroy {
    private templateRef;
    private viewContainer;
    private accessChecker;
    private alive;
    private hasView;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, accessChecker: Wtf2AccessChecker);
    wtf2IsGranted: [string, string];
    ngOnDestroy(): void;
}
