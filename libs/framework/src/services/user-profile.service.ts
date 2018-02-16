import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class UserProfileService {
    // API_PROFILE = 'http://localhost:8084';
    PROFILE_URL = '../../../../../web/jspfiles/profile/user/getuserdetails.jsp?login=';

    constructor(private httpClient: HttpClient) {
    }

    getUserDetails(loginId: string)    {
        this.httpClient.get('../jspfiles/profile/user/getuserdetails.jsp?login=' + loginId).subscribe(data => {
        // this.httpClient.get('../jspfiles/profile/user/getuserdetails.jsp?login=5c5b31ef-4854-4653-b26b-00a3370b54a0').subscribe(data => {
            console.log(data);
            return data;
        });
    }
}
