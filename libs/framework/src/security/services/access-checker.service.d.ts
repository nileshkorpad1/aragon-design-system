import { Wtf2RoleProvider } from './role.provider';
import { Wtf2AclService } from './acl.service';
import { Observable } from 'rxjs';
/**
 * Access checker service.
 *
 * Injects `Wtf2RoleProvider` to determine current user role, and checks access permissions using `Wtf2AclService`
 */
export declare class Wtf2AccessChecker {
    protected roleProvider: Wtf2RoleProvider;
    protected acl: Wtf2AclService;
    constructor(roleProvider: Wtf2RoleProvider, acl: Wtf2AclService);
    /**
     * Checks whether access is granted or not
     *
     *  {string} permission
     *  {string} resource
     *  {Observable<boolean>}
     */
    isGranted(permission: string, resource: string): Observable<boolean>;
}
