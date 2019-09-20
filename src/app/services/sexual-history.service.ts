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
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getActivity(): Observable<Person[]> {
    console.dir("calling POST service");
    return this.http.post<any>(this.url_sexualhistory,"BODY 2ND PARAM");
  }

}
