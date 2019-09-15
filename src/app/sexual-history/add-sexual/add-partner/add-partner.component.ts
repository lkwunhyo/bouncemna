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
  public contactlist = [];
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
      console.log("length of selected: " + this.selected_persons.length);
      for (let i = 0; i < this.selected_persons.length; i++) {
        //storage already checks if object is not in storage, then add. Thus no duplicate
          console.log("selected person contactID/KEY " + this.selected_persons[i].contactID);
          this.storage.set(this.selected_persons[i].contactID, this.selected_persons[i]);
          console.log("storage get value from key:" + this.storage.get(this.selected_persons[i].contactID).firstname);
    }
    //storage keeps item in "key,value(object)" pair

  }

    ngOnInit() {
        this._contactService.getContactList()
            .subscribe((res: any[]) => {
                console.log("res: " + res);
                //this.persons = res;
                this.persons = this._contactService.filterBy(res);
            });
        console.dir(this.persons);
  }

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }

}
