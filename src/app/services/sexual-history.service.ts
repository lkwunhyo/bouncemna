import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class SexualHistoryService {

  private url_sexualhistory = 'http://localhost:8080/sexualhistory';  // URL to web api
  _deleteurl = 'http://localhost:8080/deleteactivity';
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getActivity(): Observable<Person[]> {
    console.dir("calling POST service");
    return this.http.post<any>(this.url_sexualhistory,"BODY 2ND PARAM");
  }

  deleteactivity(item: any) {
    console.dir("calling DELETING POST service");
    /*
    console.dir(this.url_diagnosisparam + String(item.alertid));
    return this.http.post<any>(this.url_diagnosisparam + String(item.alertid), item);
    */
    return this.http.post<any>(this._deleteurl, item);
  }

}
