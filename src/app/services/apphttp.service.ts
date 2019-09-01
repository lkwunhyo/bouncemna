import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'; //not used
import { RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
//TRY HTTPCLIENT
@Injectable()
export class AppHttpService {
    constructor(private http: Http, private _http: HttpClient) { }

    getMessage(): Observable<any> {
        return this._http.get('…', { observe: 'response' });
    }
   /* post(url: string, data: any) {
        return this.http.post(url, this.getRequestOptions());
    }*/

    post(url: string, data: any) {
        console.dir("called post service");
        //console.dir("json: " + JSON.stringify(alert));

        return this._http.post<any>(url, data);
    }

}