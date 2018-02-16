import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Wtf2AccessChecker } from '../services/access-checker.service';
var Wtf2IsGrantedDirective = /** @class */ (function () {
    function Wtf2IsGrantedDirective(templateRef, viewContainer, accessChecker) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.accessChecker = accessChecker;
        this.alive = true;
        this.hasView = false;
    }
    Object.defineProperty(Wtf2IsGrantedDirective.prototype, "wtf2IsGranted", {
        set: function (_a) {
            var _this = this;
            var permission = _a[0], resource = _a[1];
            this.accessChecker.isGranted(permission, resource)
                .pipe(takeWhile(function () { return _this.alive; }))
                .subscribe(function (can) {
                if (can && !_this.hasView) {
                    _this.viewContainer.createEmbeddedView(_this.templateRef);
                    _this.hasView = true;
                }
                else if (!can && _this.hasView) {
                    _this.viewContainer.clear();
                    _this.hasView = false;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Wtf2IsGrantedDirective.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    Wtf2IsGrantedDirective.decorators = [
        { type: Directive, args: [{ selector: '[wtf2IsGranted]' },] },
    ];
    /** @nocollapse */
    Wtf2IsGrantedDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: ViewContainerRef, },
        { type: Wtf2AccessChecker, },
    ]; };
    Wtf2IsGrantedDirective.propDecorators = {
        "wtf2IsGranted": [{ type: Input },],
    };
    return Wtf2IsGrantedDirective;
}());
export { Wtf2IsGrantedDirective };
//# sourceMappingURL=is-granted.directive.js.map