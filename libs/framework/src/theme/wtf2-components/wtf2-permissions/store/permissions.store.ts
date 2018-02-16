import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class Wtf2PermissionsStore {

    public permissionsSource = new BehaviorSubject<{}>({});
    public permissions$: Observable<{}> = this.permissionsSource.asObservable();

    constructor() {
    }

}
