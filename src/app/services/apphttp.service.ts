import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
//TRY HTTPCLIENT
@Injectable()
export class AppHttpService {
    constructor(private http: Http, private _http: HttpClient) { }

    _authurl = '/getauth'

    post(url: string, data: any) {
        console.dir("called post service");
        //console.dir("json: " + JSON.stringify(alert));

        return this._http.post<any>(url, data);
    }

    get(url: string, data: any) {
        console.dir("called get service");
        //console.dir("json: " + JSON.stringify(alert));
        return this._http.get<any>(url, data);
    }

    getAuth() {
        console.dir("called post service");
        return this._http.post<any>(this._authurl, "BODY 2ND PARAM");
    }
    
}