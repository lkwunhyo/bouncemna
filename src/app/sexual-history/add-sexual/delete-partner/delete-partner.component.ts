import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../../models/person';
import { PERSONS } from '../../../models/person_mock';
import { ContactService } from '../../../services/contact.service';
import { LOCAL_STORAGE, SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Inject } from '@angular/core';  
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-delete-partner',
  templateUrl: './delete-partner.component.html',
  styleUrls: ['./delete-partner.component.css']
})

export class DeletePartnerComponent implements OnInit {
  @Input() query: Person;

  constructor(private _contactService: ContactService, @Inject(SESSION_STORAGE) private storage: WebStorageService) { };

  persons = [];
  selected_persons = [];
  selectedPerson: Person;

  /* Checks for checkbox selection and pushes the selected item to the input array */
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

  /* On Submit Functionality */
  OnSubmit() {
    // Submit every person where person.selected == true
    var values = Object.values(this.storage);
    var keys = this.selected_persons.map(person => person.contactID);
    for(let key of keys) {
      this.storage.remove(key);
    }
    console.log(this.storage);
  }

  ngOnInit() {
    /* Calling Contact Service to retrieve Contacts */
    this._contactService.getContactList()
      .subscribe((res: any[]) => {
          console.log(res);
          this.persons = this._contactService.filterBy(res);
      });
  }

  /* Records Selected Contact */
  onSelect(person: Person): void {
    this.selectedPerson = person;
  }
}
