import { Inject, Injectable, Optional } from '@angular/core';
import { WTF2_SECURITY_OPTIONS_TOKEN } from '../security.options';
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
        { type: Injectable },
    ];
    /** @nocollapse */
    Wtf2AclService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [WTF2_SECURITY_OPTIONS_TOKEN,] },] },
    ]; };
    return Wtf2AclService;
}());
export { Wtf2AclService };
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=acl.service.js.map