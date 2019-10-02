import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { PERSONS } from '../models/person_mock';
import { Observable, of } from 'rxjs';
import { AppHttpService } from '../services/apphttp.service'
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

    private url_contact = 'http://localhost:8080/contact';  // URL to web api
    private url_encounter_contacts = 'http://localhost:8080/encountercontacts';
    constructor(private http: HttpClient, private messageService: MessageService) { }

  getContacts() {
    return PERSONS;
  }

  filterBy(values: Person[]) {
    function orderByName(a, b) {
      if ( a.firstname < b.firstname ){
        return -1;
      }
      if ( a.firstname > b.firstname ){
        return 1;
      }
      return 0;
    }
    values.sort(orderByName)
    return values;
    }

    filterByDate(values: any[]) {
        function orderByDate(a, b) {
            if (a.dateEncounter < b.dateEncounter) {
                return -1;
            }
            if (a.dateEncounter > b.dateEncounter) {
                return 1;
            }
            return 0;
        }
        values.sort(orderByDate)
        return values;
    }

  /** GET heroes from the server */
    getContactList(): Observable<Person[]> {
        console.dir("calling POST service");
        return this.http.post<any>(this.url_contact,"BODY 2ND PARAM");
    }

    //get contacts that user has encountered
    getEncounterContacts(): Observable<Person[]> { 
        console.dir("calling POST service");
        return this.http.post<any>(this.url_encounter_contacts, "BODY 2ND PARAM");
    }
}


