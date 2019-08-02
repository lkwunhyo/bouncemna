import { Injectable } from '@angular/core';
import { Disease } from '../models/disease.model';
import { DISEASES } from '../models/disease_mock';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  constructor() { }

  getDiseases() {
    return DISEASES;
  }

  filterBy() {
    var values = this.getDiseases();
    function orderByName(a, b) {
      if ( a.disease < b.disease ){
        return -1;
      }
      if ( a.disease > b.disease ){
        return 1;
      }
      return 0;
    }
    values.sort(orderByName)
    return values;
  }
  
}