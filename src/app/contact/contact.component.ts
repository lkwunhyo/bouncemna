import { Component, OnInit, Input} from '@angular/core';
import { Person } from '../models/person';
import { PERSONS } from '../models/person_mock';
import { ContactService } from '../services/contact.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public contactlist = [];
  @Input() query: Person;

  constructor(private _contactService: ContactService) { };

  persons = [];
  selectedPerson: Person;

  ngOnInit() {
    /* Retrieving Contact from Database */
    this._contactService.getContactList()
        .subscribe((res: any[]) => {
            console.log(res);
            this.contactlist = this._contactService.filterBy(res);
        });
  }

  /* Records the Selected Contact */
  onSelect(person: Person): void {
    this.selectedPerson = person;
  }

}
