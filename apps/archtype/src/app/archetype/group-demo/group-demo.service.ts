import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class GroupDemoService {
    constructor(private _httpClient: HttpClient) {}
    getContacts(contactId): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get('api/chat-panel-contacts/' + contactId)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
