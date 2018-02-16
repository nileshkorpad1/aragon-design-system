import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WTF2_SECURITY_OPTIONS_TOKEN } from './security.options';
import { Wtf2AclService } from './services/acl.service';
import { Wtf2AccessChecker } from './services/access-checker.service';
import { Wtf2IsGrantedDirective } from './directives/is-granted.directive';
var Wtf2SecurityModule = /** @class */ (function () {
    function Wtf2SecurityModule() {
    }
    Wtf2SecurityModule.forRoot = function (nbSecurityOptions) {
        return {
            ngModule: Wtf2SecurityModule,
            providers: [
                { provide: WTF2_SECURITY_OPTIONS_TOKEN, useValue: nbSecurityOptions },
                Wtf2AclService,
                Wtf2AccessChecker,
            ],
            exports: [
                Wtf2IsGrantedDirective,
            ],
        };
    };
    Wtf2SecurityModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                    ],
                    declarations: [
                        Wtf2IsGrantedDirective,
                    ],
                    exports: [
                        Wtf2IsGrantedDirective,
                    ],
                },] },
    ];
    return Wtf2SecurityModule;
}());
export { Wtf2SecurityModule };
//# sourceMappingURL=security.module.js.map