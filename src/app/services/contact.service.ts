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
    private url_contactform = 'http://localhost:8080/contactform';  // URL to web api
    constructor(private http: HttpClient, private messageService: MessageService) { }

  getContacts() {
    return PERSONS;
  }

  filterBy() {
    var values = this.getContacts();
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

  /** GET heroes from the server */
  getContactList (): Observable<Person[]> {
    return this.http.get<Person[]>(this.url_contactform)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Person[]>('getPersons', []))
      );
  }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`contactService: ${message}`);
    }
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}


