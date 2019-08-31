import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Person } from '../../models/person';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.css']
})
export class DeleteContactComponent implements OnInit {
  @Input() query: Person;

  persons = [];
  selected_persons = [];
  deleteContactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private _contactService: ContactService) { 
    this.deleteContactForm = this.formBuilder.group({
      deleteContact: new FormControl([])
    });

  }
  
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
  

  onSubmit() {
    this.deleteContactForm = this.formBuilder.group({
      deleteContact: new FormControl(
        this.selected_persons
      )
    });
    console.log(this.deleteContactForm);
    // Submit every person where person.selected == true
    // Delete those from the database
  }


  selectedPerson: Person;

  ngOnInit() {
    this.persons = this._contactService.filterBy();
  }

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }
  

}
