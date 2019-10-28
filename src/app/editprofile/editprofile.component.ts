import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { ProfileService } from '../services/profile.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Inject } from '@angular/core';
import { Router } from "@angular/router";
import { Person } from '../models/person';
import { PERSONS } from '../models/person_mock';
import { ContactService } from '../services/contact.service';

@Component({
    selector: 'app-editprofile',
    templateUrl: './editprofile.component.html',
    styleUrls: ['./editprofile.component.css']
})


export class EditprofileComponent implements OnInit {
    profileForm: FormGroup;
    editprofile: RegisterModel = new RegisterModel();
    reg;
    constructor(private _profileService: ProfileService, private formBuilder: FormBuilder, private router: Router) {
        this.profileForm = this.formBuilder.group({
            firstname: this.editprofile.firstname,
            lastname: this.editprofile.lastname,
            phone: this.editprofile.phone,
            email: this.editprofile.email,
            gender: this.editprofile.gender
        });
    }

    profile: any;
    isMale = false;
    isFemale = false;
    ngOnInit() {
        this._profileService.getProfile()
            .subscribe((res: any[]) => {
                this.profile = res;
                this.editprofile.bio = this.profile.bio;
                this.editprofile.firstname = this.profile.firstname;
                this.editprofile.lastname = this.profile.lastname;
                this.editprofile.phone = this.profile.phone;
                this.editprofile.email = this.profile.email;
                this.editprofile.gender = this.profile.gender;

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



    onSubmit() {
        this._profileService.editProfile(this.editprofile).subscribe(
            alert => {
                console.log('Success!', alert); this.reg = alert;
            },
            error => console.error('Error!', error),
            () => {
                if (this.reg.status == true) {
                    alert("Login post successful");
                    this.router.navigateByUrl("/profile");
                } else {
                    alert(this.reg.message);
                }
            },
        );
    }

}
