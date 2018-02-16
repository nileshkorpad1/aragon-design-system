(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs/operators')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'rxjs/operators'], factory) :
	(factory((global.nb = global.nb || {}, global.nb.security = global.nb.security || {}),global.ng.core,global.ng.common,global.Rx.operators));
}(this, (function (exports,_angular_core,_angular_common,rxjs_operators) { 'use strict';

var WTF2_SECURITY_OPTIONS_TOKEN = new _angular_core.InjectionToken('Nebular Security Options');

var shallowObjectClone = function (o) { return Object.assign({}, o); };
var ɵ0 = shallowObjectClone;
var shallowArrayClone = function (a) { return Object.assign([], a); };
var ɵ1 = shallowArrayClone;
var popParent = function (abilities) {
    var parent = abilities['parent'];
    delete abilities['parent'];
    return parent;
};
var ɵ2 = popParent;
/**
 * Common acl service.
 */
var Wtf2AclService = /** @class */ (function () {
    function Wtf2AclService(settings) {
        if (settings === void 0) { settings = {}; }
        this.settings = settings;
        this.state = {};
        if (settings.accessControl) {
            this.setAccessControl(settings.accessControl);
        }
    }
    /**
     * Set/Reset ACL list
     * @param {Wtf2AccessControl} list
     */
    /**
       * Set/Reset ACL list
       * @param {Wtf2AccessControl} list
       */
    Wtf2AclService.prototype.setAccessControl = /**
       * Set/Reset ACL list
       * @param {Wtf2AccessControl} list
       */
    function (list) {
        for (var _i = 0, _a = Object.entries(list); _i < _a.length; _i++) {
            var _b = _a[_i], role = _b[0], value = _b[1];
            var abilities = shallowObjectClone(value);
            var parent_1 = popParent(abilities);
            this.register(role, parent_1, abilities);
        }
    };
    /**
     * Register a new role with a list of abilities (permission/resources combinations)
     * @param {string} role
     * @param {string} parent
     * @param {[permission: string]: string|string[]} abilities
     */
    /**
       * Register a new role with a list of abilities (permission/resources combinations)
       * @param {string} role
       * @param {string} parent
       * @param {[permission: string]: string|string[]} abilities
       */
    Wtf2AclService.prototype.register = /**
       * Register a new role with a list of abilities (permission/resources combinations)
       * @param {string} role
       * @param {string} parent
       * @param {[permission: string]: string|string[]} abilities
       */
    function (role, parent, abilities) {
        if (parent === void 0) { parent = null; }
        if (abilities === void 0) { abilities = {}; }
        this.validateRole(role);
        this.state[role] = {
            parent: parent,
        };
        for (var _i = 0, _a = Object.entries(abilities); _i < _a.length; _i++) {
            var _b = _a[_i], permission = _b[0], value = _b[1];
            var resources = typeof value === 'string' ? [value] : value;
            this.allow(role, permission, shallowArrayClone(resources));
        }
    };
    /**
     * Allow a permission for specific resources to a role
     * @param {string} role
     * @param {string} permission
     * @param {string | string[]} resource
     */
    /**
       * Allow a permission for specific resources to a role
       * @param {string} role
       * @param {string} permission
       * @param {string | string[]} resource
       */
    Wtf2AclService.prototype.allow = /**
       * Allow a permission for specific resources to a role
       * @param {string} role
       * @param {string} permission
       * @param {string | string[]} resource
       */
    function (role, permission, resource) {
        this.validateRole(role);
        if (!this.getRole(role)) {
            this.register(role, null, {});
        }
        resource = typeof resource === 'string' ? [resource] : resource;
        var resources = shallowArrayClone(this.getRoleResources(role, permission));
        resources = resources.concat(resource);
        this.state[role][permission] = resources
            .filter(function (item, pos) { return resources.indexOf(item) === pos; });
    };
    /**
     * Check whether the role has a permission to a resource
     * @param {string} role
     * @param {string} permission
     * @param {string} resource
     * @returns {boolean}
     */
    /**
       * Check whether the role has a permission to a resource
       * @param {string} role
       * @param {string} permission
       * @param {string} resource
       * @returns {boolean}
       */
    Wtf2AclService.prototype.can = /**
       * Check whether the role has a permission to a resource
       * @param {string} role
       * @param {string} permission
       * @param {string} resource
       * @returns {boolean}
       */
    function (role, permission, resource) {
        this.validateResource(resource);
        var parentRole = this.getRoleParent(role);
        var parentCan = parentRole && this.can(this.getRoleParent(role), permission, resource);
        return parentCan || this.exactCan(role, permission, resource);
    };
    Wtf2AclService.prototype.getRole = function (role) {
        return this.state[role];
    };
    Wtf2AclService.prototype.validateRole = function (role) {
        if (!role) {
            throw new Error('Wtf2AclService: role name cannot be empty');
        }
    };
    Wtf2AclService.prototype.validateResource = function (resource) {
        if (!resource || [Wtf2AclService.ANY_RESOURCE].includes(resource)) {
            throw new Error("Wtf2AclService: cannot use empty or bulk '*' resource placeholder with 'can' method");
        }
    };
    Wtf2AclService.prototype.exactCan = function (role, permission, resource) {
        var resources = this.getRoleResources(role, permission);
        return resources.includes(resource) || resources.includes(Wtf2AclService.ANY_RESOURCE);
    };
    Wtf2AclService.prototype.getRoleResources = function (role, permission) {
        return this.getRoleAbilities(role)[permission] || [];
    };
    Wtf2AclService.prototype.getRoleAbilities = function (role) {
        var abilities = shallowObjectClone(this.state[role] || {});
        popParent(shallowObjectClone(this.state[role] || {}));
        return abilities;
    };
    Wtf2AclService.prototype.getRoleParent = function (role) {
        return this.state[role] ? this.state[role]['parent'] : null;
    };
    Wtf2AclService.ANY_RESOURCE = '*';
    Wtf2AclService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    Wtf2AclService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [WTF2_SECURITY_OPTIONS_TOKEN,] },] },
    ]; };
    return Wtf2AclService;
}());

var Wtf2RoleProvider = /** @class */ (function () {
    function Wtf2RoleProvider() {
    }
    return Wtf2RoleProvider;
}());

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
            .pipe(rxjs_operators.map(function (role) { return Array.isArray(role) ? role : [role]; }), rxjs_operators.map(function (roles) {
            return roles.some(function (role) { return _this.acl.can(role, permission, resource); });
        }));
    };
    Wtf2AccessChecker.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    Wtf2AccessChecker.ctorParameters = function () { return [
        { type: Wtf2RoleProvider, },
        { type: Wtf2AclService, },
    ]; };
    return Wtf2AccessChecker;
}());

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
                .pipe(rxjs_operators.takeWhile(function () { return _this.alive; }))
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
        { type: _angular_core.Directive, args: [{ selector: '[wtf2IsGranted]' },] },
    ];
    /** @nocollapse */
    Wtf2IsGrantedDirective.ctorParameters = function () { return [
        { type: _angular_core.TemplateRef, },
        { type: _angular_core.ViewContainerRef, },
        { type: Wtf2AccessChecker, },
    ]; };
    Wtf2IsGrantedDirective.propDecorators = {
        "wtf2IsGranted": [{ type: _angular_core.Input },],
    };
    return Wtf2IsGrantedDirective;
}());

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
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        _angular_common.CommonModule,
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

exports.WTF2_SECURITY_OPTIONS_TOKEN = WTF2_SECURITY_OPTIONS_TOKEN;
exports.Wtf2SecurityModule = Wtf2SecurityModule;
exports.Wtf2AclService = Wtf2AclService;
exports.ɵ0 = ɵ0;
exports.ɵ1 = ɵ1;
exports.ɵ2 = ɵ2;
exports.Wtf2AccessChecker = Wtf2AccessChecker;
exports.Wtf2RoleProvider = Wtf2RoleProvider;

Object.defineProperty(exports, '__esModule', { value: true });

})));
