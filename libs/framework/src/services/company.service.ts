import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class CompanyService {
    // API_PROFILE = 'http://localhost:8084';
    ADMIN_URL = 'http://localhost:8084/deskeraplatform/a/sg1/admin.jsp?action=5&cmode=1';
    private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };

    constructor(private httpClient: HttpClient) {
    }

    getCompany() {
        const formData = new FormData();
        formData.append('action', '5');
        formData.append('cmode', '1');
        console.log('companyservice is called');
        console.log(formData);
        console.log(formData.get('action'));
        console.log(formData.get('cmode'));
        return this.httpClient.post(`${this.ADMIN_URL}`, formData, this._options);
    }
}
