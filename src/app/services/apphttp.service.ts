import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';


@Injectable()
export class AppHttpService {
    constructor(private http: Http) { }

    getHeaders() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    getRequestOptions(): RequestOptions {
        const options = new RequestOptions();
        options.headers = this.getHeaders();

        return options;
    }

    get(url: string, data: any) {
        return this.http.get(url, this.getRequestOptions());
    }

    post(url: string, data: any) {
        return this.http.post(url, this.getRequestOptions());
    }

}