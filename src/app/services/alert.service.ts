import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { alertPartnersModel } from '../models/alert-partners.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AlertService {
private subject = new Subject<any>();
private keepAfterNavigationChange = false;


    _url = '/alertpartners';
    _url_disease = '/diseases';

constructor(private router: Router, private _http: HttpClient) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    alertpartners(alert: alertPartnersModel) {
        console.dir("called service");
        //console.dir("json: " + JSON.stringify(alert));
        console.dir("alert.diagnosis: " + alert.diagnosis);

        return this._http.post<any>(this._url, alert);
    }


    getDiseases() {
        console.dir("called disease service");
        return this._http.post<any>(this._url_disease, "Empty body");
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
