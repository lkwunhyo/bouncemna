import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class DeleteContactService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;
  _url = '/deletecontact';

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

  deletecontacts(contacts: any) {
    return this._http.post<any>(this._url, contacts);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
