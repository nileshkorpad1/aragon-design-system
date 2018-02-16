import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class UserService {
    GLOBAL_URL = 'http://localhost:8084/deskeraplatform/a/sg1/';
    USER_ADMIN_URL = this.GLOBAL_URL + 'admin.jsp?action=1&statusid=1&filterFlag=true&sort=fullname&dir=ASC&roleid=&appid=';
    UPDATE_USER_URL = this.GLOBAL_URL + 'admin.jsp?action=7&mode=6';
    PROFILE_URL = this.GLOBAL_URL + 'admin.jsp?action=7&mode=5';
    CREATE_USER_URL = this.GLOBAL_URL + 'admin.jsp?action=7&mode=0&planprice=6031';
    SAMPLE_GET_PROFILE_URL = this.GLOBAL_URL + 'admin.jsp?action=7&mode=5';
    private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };

    constructor(private httpClient: HttpClient) {
    }

    getSampleProfile()  {
        const formData = new FormData();
        formData.append('action', '7');
        formData.append('mode', '5');
        return this.httpClient.post(`${this.SAMPLE_GET_PROFILE_URL}`, formData, this._options);
    }

    getAllUsers() {
        const formData = new FormData();
        formData.append('action', '1');
        formData.append('statusid', '1');
        formData.append('filterFlag', 'true');
        formData.append('sort', 'fullname');
        formData.append('dir', 'ASC');
        formData.append('roleid', '');
        formData.append('appid', '');
        console.log('abc');
        return this.httpClient.post(`${this.USER_ADMIN_URL}`, formData);
    }

    createUser(passData: FormData) {
        this.httpClient.post(this.CREATE_USER_URL, passData)
            .subscribe(
                formData => {
                    console.log('POST Request is successful ', formData, this._options);
                },
                error => {
                    console.log('Error', error);
                },
            );
    }

    // updateProfile(passData: FormData) { //original update Profile
    //     this.httpClient.post(this.UPDATE_USER_URL, passData)
    //         .subscribe(
    //             formData => {
    //                 console.log('POST Request is successful ', formData);
    //             },
    //             error => {
    //                 console.log('Error', error);
    //             },
    //         );
    //     // return this.httpClient.post(`${this.UPDATE_USER_URL}`, formData, this._options);
    // }

    updateProfile(email, firstName, lastName, image, contact, address, timezone, facebookid, twitterid, linkedinid) {
        const formData = new FormData();
        formData.append('emailid', email);
        formData.append('fname', firstName);
        formData.append('lname', lastName);
        formData.append('image', image);
        formData.append('contactno', contact);
        formData.append('address', address);
        formData.append('timezone', timezone);
        formData.append('facebookid', facebookid);
        formData.append('twitterid', twitterid);
        formData.append('linkedinid', linkedinid);

        this.httpClient.post(this.UPDATE_USER_URL, formData)
            .subscribe(
                response => {
                    console.log('POST Request is successful ', response);
                },
                error => {
                    console.log('Error', error);
                },
            );
    }

    getProfile() {
        const formData = new FormData();
        formData.append('action', '7');
        formData.append('cmode', '5');
        return this.httpClient.post(`${this.PROFILE_URL}`, formData, this._options);
    }
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   *  operation - name of the operation that failed
   *  result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            // this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
