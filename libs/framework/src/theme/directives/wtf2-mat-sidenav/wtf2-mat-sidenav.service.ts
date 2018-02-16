import { Injectable } from '@angular/core';
import { Wtf2Sidenav } from '../../../theme/wtf2-material';

@Injectable({
    providedIn: 'root',
})
export class Wtf2SidenavHelperService {
    sidenavInstances: Wtf2Sidenav[];

    /**
     * Constructor
     */
    constructor() {
        this.sidenavInstances = [];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------


    setSidenav(id, instance): void {
        this.sidenavInstances[id] = instance;
    }


    getSidenav(id): any {
        return this.sidenavInstances[id];
    }
}
