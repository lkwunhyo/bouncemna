import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { PERSONS } from '../models/person_mock';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

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
  
}
