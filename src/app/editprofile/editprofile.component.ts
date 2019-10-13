import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { ProfileService } from '../services/profile.service';
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
    constructor(private _profileService: ProfileService) { }
    profile: any;
    isMale = false;
    isFemale = false;
    ngOnInit() {
        this._profileService.getProfile()
            .subscribe((res: any[]) => {
                this.profile = res;
                if (this.profile.gender == "m") {
                    this.isMale = true;
                    this.isFemale = false;
                }
                if (this.profile.gender == "f") {
                    this.isMale = false;
                    this.isFemale = true;
                }
            });
  }

}
