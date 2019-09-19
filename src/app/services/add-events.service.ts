import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { alertPartnersModel } from '../models/alert-partners.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class AddEventsService {
private subject = new Subject<any>();
private keepAfterNavigationChange = false;


    _url = 'http://localhost:8080/alertpartners';

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

    addEvents(calForm: FormBuilder) {
        console.dir("called service");
        //console.dir("json: " + JSON.stringify(alert));
        console.dir("calForm.diagnosis: " + calForm);

        return this._http.post<any>(this._url, alert);
}


    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
