/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Observable } from 'rxjs';
export declare abstract class Wtf2RoleProvider {
    /**
     * Returns current user role
     *  {Observable<string | string[]>}
     */
    abstract getRole(): Observable<string | string[]>;
}
