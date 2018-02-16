import { Injectable } from '@angular/core';
import { Wtf2RoleProvider } from './role.provider';
import { Wtf2AclService } from './acl.service';
import { map } from 'rxjs/operators';
/**
 * Access checker service.
 *
 * Injects `Wtf2RoleProvider` to determine current user role, and checks access permissions using `Wtf2AclService`
 */
var Wtf2AccessChecker = /** @class */ (function () {
    function Wtf2AccessChecker(roleProvider, acl) {
        this.roleProvider = roleProvider;
        this.acl = acl;
    }
    /**
     * Checks whether access is granted or not
     *
     * @param {string} permission
     * @param {string} resource
     * @returns {Observable<boolean>}
     */
    /**
       * Checks whether access is granted or not
       *
       * @param {string} permission
       * @param {string} resource
       * @returns {Observable<boolean>}
       */
    Wtf2AccessChecker.prototype.isGranted = /**
       * Checks whether access is granted or not
       *
       * @param {string} permission
       * @param {string} resource
       * @returns {Observable<boolean>}
       */
    function (permission, resource) {
        var _this = this;
        return this.roleProvider.getRole()
            .pipe(map(function (role) { return Array.isArray(role) ? role : [role]; }), map(function (roles) {
            return roles.some(function (role) { return _this.acl.can(role, permission, resource); });
        }));
    };
    Wtf2AccessChecker.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Wtf2AccessChecker.ctorParameters = function () { return [
        { type: Wtf2RoleProvider, },
        { type: Wtf2AclService, },
    ]; };
    return Wtf2AccessChecker;
}());
export { Wtf2AccessChecker };
//# sourceMappingURL=access-checker.service.js.map