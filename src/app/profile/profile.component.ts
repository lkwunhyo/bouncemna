import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profile: any;
    public profileQR: string = null;

    constructor(private _profileService: ProfileService, private formBuilder: FormBuilder, ) {

    }

    ngOnInit() {
        this._profileService.getProfile()
            .subscribe((res: any[]) => {
                this.profile = res;
                /*
                this.profileQR = `BEGIN:VCARD
VERSION:3.0
N:${this.profile.lastname}; ${this.profile.firstname}
FN:${this.profile.firstname} ${this.profile.lastname}
KEY:${this.profile.userid}
EMAIL:${this.profile.email}
NOTE:${this.profile.gender}
TEL;TYPE=voce,work,pref:${this.profile.phone}
END:VCARD
`
                */
                this.profileQR = JSON.stringify(res);
                console.log(this.profileQR);
            });

    }

}
