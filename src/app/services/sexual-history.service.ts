import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class SexualHistoryService {

  private url_sexualhistory = '/sexualhistory';  // URL to web api
  _deleteurl = '/deleteactivity';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /* Action URL Post for Getting Sexual Activity */
  getActivity(): Observable<Person[]> {
    console.dir("calling POST service");
    return this.http.post<any>(this.url_sexualhistory,"BODY 2ND PARAM");
  }

  /* Action URL Post for Deleting Sexual Activity */
  deleteactivity(item: any) {
    console.dir("calling DELETING POST service");
    return this.http.post<any>(this._deleteurl, item);
  }

}
