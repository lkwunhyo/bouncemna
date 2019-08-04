import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

import { Person } from '../models/person';
import { PERSONS } from '../models/person_mock';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
    editprofileForm: RegisterModel = new RegisterModel();
    constructor() { }

    ngOnInit() {
    
  }

}
