import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../../models/person';
import { PERSONS } from '../../../models/person_mock';
import { ContactService } from '../../../services/contact.service';
import { LOCAL_STORAGE, SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Inject } from '@angular/core';  
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})
export class AddPartnerComponent implements OnInit {
    @Input() query: Person;
  constructor(private _contactService: ContactService, @Inject(SESSION_STORAGE) private storage: WebStorageService) { };

  persons = [];
  selected_persons = [];
  selectedPerson: Person;

  OnCheckboxSelect(person, status:boolean) {
    if (this.selected_persons.indexOf(person) === -1 && status) {
      this.selected_persons.push(person);
    }
    else if(!status) {
      let index = this.selected_persons.indexOf(person);
      this.selected_persons.splice(index, 1);
    }
    console.log(this.selected_persons);
    
  }

  OnSubmit() {
    // Submit every person where person.selected == true
    for(let i = 0; i < this.selected_persons.length; i++) {
      this.storage.set(this.selected_persons[i].id, this.selected_persons[i]);
    }
    console.log(this.storage);

  }

  ngOnInit() {
    this.persons = this._contactService.filterBy();
  }

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }

}
