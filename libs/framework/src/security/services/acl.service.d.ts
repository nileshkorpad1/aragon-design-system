import { Wtf2AclOptions, Wtf2AccessControl } from '../security.options';
/**
 * Common acl service.
 */
export declare class Wtf2AclService {
    protected settings: Wtf2AclOptions;
    private static readonly ANY_RESOURCE;
    private state;
    constructor(settings?: Wtf2AclOptions);
    /**
     * Set/Reset ACL list
     *  {Wtf2AccessControl} list
     */
    setAccessControl(list: Wtf2AccessControl): void;
    /**
     * Register a new role with a list of abilities (permission/resources combinations)
     *  {string} role
     *  {string} parent
     *  {[permission: string]: string|string[]} abilities
     */
    register(role: string, parent?: string, abilities?: {
        [permission: string]: string | string[];
    }): void;
    /**
     * Allow a permission for specific resources to a role
     *  {string} role
     *  {string} permission
     *  {string | string[]} resource
     */
    allow(role: string, permission: string, resource: string | string[]): void;
    /**
     * Check whether the role has a permission to a resource
     *  {string} role
     *  {string} permission
     *  {string} resource
     *  {boolean}
     */
    can(role: string, permission: string, resource: string): any;
    private getRole(role);
    private validateRole(role);
    private validateResource(resource);
    private exactCan(role, permission, resource);
    private getRoleResources(role, permission);
    private getRoleAbilities(role);
    private getRoleParent(role);
}
