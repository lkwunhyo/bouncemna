import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, TokenPayload } from '../authentication.service'
import { AppHttpService } from '../services/apphttp.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
user = new RegisterModel();
registerForm: FormGroup;
    hide = true;
    credentials: TokenPayload;
    _url = '/register'
    constructor(private formBuilder: FormBuilder, private _apphttpService: AppHttpService,
    private router: Router) { 
      this.registerForm = this.formBuilder.group({
      });
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'firstname': [this.user.firstname, [
        Validators.required
      ]],
      'lastname': [this.user.lastname, [
        Validators.required
      ]],
      'gender': [this.user.gender, [
        Validators.required
      ]],
      'email': [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      'username': [this.user.username, [
        Validators.required
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]],
        'phone': [this.user.phone, [
          Validators.required
      ]]
    });
  }

    onRegisterSubmit() {
        this.credentials = {
            first_name: this.user.firstname,
            last_name: this.user.lastname,
            email: this.user.email,
            gender: this.user.gender,
        };
        
        this._apphttpService.post(this._url, this.user).subscribe(
            registration => console.log('Success!', registration),
            error => console.error('Error!', error),
            () => {
                alert("Registration successful");
                this.router.navigateByUrl("/login");
            },
        );

  }

}
