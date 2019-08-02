import { Component, OnInit } from '@angular/core';
import { Person } from '../../../models/person';
import { PERSONS } from '../../../models/person_mock';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-delete-partner',
  templateUrl: './delete-partner.component.html',
  styleUrls: ['./delete-partner.component.css']
})
export class DeletePartnerComponent implements OnInit {

  constructor(private _contactService: ContactService) { };

  persons = [];
  selectedPerson: Person;

  ngOnInit() {
    this.persons = this._contactService.filterBy();
  }

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }
}
