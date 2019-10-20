import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { alertPartnersModel } from '../models/alert-partners.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppHttpService } from '../services/apphttp.service'
import { catchError, map, tap } from 'rxjs/operators';
import { events } from '../models/events';
import { PERSONS } from '../models/person_mock';


@Injectable({ providedIn: 'root' })
export class GetEventsService {
private subject = new Subject<any>();
private keepAfterNavigationChange = false;


    _url = 'http://localhost:8080/getEvents';

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

    getEvents() {
        return events;
      }

    addEvents(calForm: any) {
        console.dir("called addevents service");
        console.dir("json: " + JSON.stringify(calForm));
        console.dir("calForm: " + calForm);

        return this._http.post<any>(this._url, calForm);
}


    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    /** GET heroes from the server */
    getEventsList(): Observable<events[]> {
        console.dir("calling POST service");
        return this._http.post<any>(this._url,"BODY 2ND PARAM");
    }
}