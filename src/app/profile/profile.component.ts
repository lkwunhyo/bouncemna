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

    constructor(private _profileService: ProfileService, private formBuilder: FormBuilder, ) {

    }


    ngOnInit() {
        this._profileService.getProfile()
            .subscribe((res: any[]) => {
                this.profile = res;
            });

    }

}
