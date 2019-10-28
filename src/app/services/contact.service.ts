import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { PERSONS } from '../models/person_mock';
import { Observable, of } from 'rxjs';
import { AppHttpService } from '../services/apphttp.service'
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../services/message.service';
import * as moment from 'moment';
import { and } from '@angular/router/src/utils/collection';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

    private url_contact = '/contact';  // URL to web api
    private url_encounter_contacts = '/encountercontacts';
    constructor(private http: HttpClient, private messageService: MessageService) { }

  /* Function to Get Hardcoded Contacts (Testing Purposes) */
  getContacts() {
    return PERSONS;
  }

  /* Filters Contact List by Alphabetical Order */
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
    if (values) {
      values.sort(orderByName)
    }
    return values;
  }

  /* Filters Contact List by Date Diagnosed and Diagnosis Tracing Period */
  filterByDate(values: any[], dateDiagnosed: any, tracingPeriod: any) {
      var recent_contacts = [];

      function orderByDate(a, b) {
          if (a.dateEncounter < b.dateEncounter) {
              return -1;
          }
          if (a.dateEncounter > b.dateEncounter) {
              return 1;
          }
          return 0;
      }
      if(values) {
        values.sort(orderByDate) //before filtering by tracing period
      }
      if (dateDiagnosed != 0 && tracingPeriod != 0) {
          console.log("month difference");
          for (let person of values) {
              var diff = (moment(dateDiagnosed).diff(moment(person.dateEncounter), 'months'));
              //should i give a leeway of an extra month?
              console.log(person.dateEncounter + " - " + dateDiagnosed);

              console.log((diff) + " < " + tracingPeriod);
              //

              console.log(diff < (tracingPeriod));
              if (diff < Number(tracingPeriod) && diff >= 0) { //More recent encounters has lesser date difference, future encounters have negative date difference
                  recent_contacts.push(person);
              }
          }
          console.log("recent contacts");
          console.log(recent_contacts);
      } else {
          return values;
      }


      return recent_contacts;
  }

  /* GET heroes from the server */
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


