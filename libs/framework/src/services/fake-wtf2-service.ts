import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class FakeWtf2Service {
    API_URL = 'http://localhost:3000';
    PROFILE_URL = '../../../../../web/jspfiles/profile/user/getuserdetails.jsp?login=';
    // tslint:disable-next-line:max-line-length
    APPS_PROFILE = 'http://localhost:8084/deskeraplatform/a/sg1/jspfiles/profile/user/getuserdetails.jsp?login=5c5b31ef-4854-4653-b26b-00a3370b54a0&_wtf2=1539834316329';
    private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' }) };
    private _optionsJSP = { headers: new HttpHeaders({ 'Pragma': 'no-cache' }) };
    private headerJSP;


    constructor(private httpClient: HttpClient) {
        let headerJSP: HttpHeaders = new HttpHeaders();
        headerJSP = headerJSP.append('Pragma', 'no-cache');
        headerJSP = headerJSP.append('DNT', '1');
        headerJSP = headerJSP.append('Accept', '*/*');
        headerJSP = headerJSP.append('Connection', 'keep-alive');
        headerJSP = headerJSP.append('Referer', 'http://localhost:8084/deskeraplatform/a/sg1/');
        // tslint:disable-next-line:max-line-length
        headerJSP = headerJSP.append('Cookie', 'JSESSIONID=569E9D0B85F6D7ACCF1C84D13CB7ED1A; BAYEUX_BROWSER=ee6d4972954ea7a1af1316680fdb97166761b2b; lid=5c5b31ef-4854-4653-b26b-00a3370b54a0; username=Admin; lastlogin=2018-10-18 07:28:00.0');
        headerJSP = headerJSP.append('X-Requested-With', 'XMLHttpRequest');
        headerJSP = headerJSP.append('Cache-Control', 'no-cache');
        headerJSP = headerJSP.append('Accept-Encoding', 'g-zip, deflate, br');
        headerJSP = headerJSP.append('Accept-Language', 'en-GB,en-US;q=0.9,en;q=0.8');
        // tslint:disable-next-line:max-line-length
        headerJSP = headerJSP.append('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36 OPR/56.0.3051.43');
    }

    createAuthors(authors) {
        // return this.httpClient.post(`${this.API_URL}/author/`, (authors), this._options);
    }

    getAuthors() {
        // return this.httpClient.get(`${this.API_URL}/author/`, this._options);
    }

    saveInvoice(invoice) {
        console.log(this._options);
        return this.httpClient.post(`${this.API_URL}/invoice/`, (invoice), this._options);
    }
}
