import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.css']
})
export class DeleteContactComponent implements OnInit {
/*
  constructor(priva) { }

  ngOnInit() {
  }*/
    @Input() query: Person;
  constructor(private _contactService: ContactService) { };

  persons = [];

  
  OnCheckboxSelect(person, status:boolean) {
    if (this.persons.indexOf(person) === -1 && status) {
      this.persons.push(person);
    }
    else if(!status) {
      let index = this.persons.indexOf(person);
      this.persons.splice(index, 1);
    }
    //console.log(this.persons);
  }
  

  OnSubmit() {
    // Submit every person where person.selected == true
    // Delete those from the database
  }

  get diagnostic() { return JSON.stringify(this.persons); }
  
  selectedPerson: Person;

  ngOnInit() {
    this.persons = this._contactService.filterBy();
  }

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }
  

}
