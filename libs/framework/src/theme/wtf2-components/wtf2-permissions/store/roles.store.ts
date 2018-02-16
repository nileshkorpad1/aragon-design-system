import { BehaviorSubject, Observable } from 'rxjs';

export class Wtf2RolesStore {

    public rolesSource = new BehaviorSubject<{}>({});

    public roles$: Observable<{}> = this.rolesSource.asObservable();

}
