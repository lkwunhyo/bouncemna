import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private url_profile = '/profile';  // URL to web api
    private url_editprofile = '/editprofile';
    constructor(private http: HttpClient) { }


    /** get profile from the server */
    getProfile(): Observable<any> {
        console.dir("calling POST service");
        return this.http.post<any>(this.url_profile, "BODY 2ND PARAM");
    }

    editProfile(edit:any) {
        console.dir("calling POST service");
        return this.http.post<any>(this.url_editprofile, edit);
    }

}