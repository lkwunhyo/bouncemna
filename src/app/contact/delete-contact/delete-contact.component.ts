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
  selectedPerson: Person;

  ngOnInit() {
    this.persons = this._contactService.filterBy();
  }

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }

}
