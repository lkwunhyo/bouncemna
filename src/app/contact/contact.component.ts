import { Component, OnInit, Input} from '@angular/core';
import { Person } from '../models/person';
import { PERSONS } from '../models/person_mock';
import { ContactService } from '../services/contact.service';
import { FormsModule } from '@angular/forms';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    public contactlist = [];
    @Input() query: Person;
  constructor(private _contactService: ContactService, private router: Router) { };

  persons = [];
  selectedPerson: Person;

  ngOnInit() {
      /*this.persons = this._contactService.filterBy();*/
      try {
          this._contactService.getContactList()
              .subscribe((res: any[]) => {
                  console.log(res);
                  this.contactlist = this._contactService.filterBy(res);
                  //this.persons = this.contactlist.filterBy(); //Should filter by last encounter date
              });
      } catch (error) {
          console.log(error);
          this.router.navigate(['/login']); 
      }
  }

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }

}
