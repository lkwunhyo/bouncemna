import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../../models/person';
import { PERSONS } from '../../../models/person_mock';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})
export class AddPartnerComponent implements OnInit {
    @Input() query: Person;
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
