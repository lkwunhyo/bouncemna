import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppHttpService } from '../services/apphttp.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
user: LoginModel = new LoginModel();
loginForm: FormGroup;
    hide = true;
    _url = '//localhost:8080/login'

    constructor(private formBuilder: FormBuilder, private _apphttpService: AppHttpService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'name': [this.user.name, [
        Validators.required
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]]
    });
  }

  onRegisterSubmit() { //sign in
      this._apphttpService.post(this._url, this.user).subscribe(
          registration => console.log('Success!', registration),
          error => console.error('Error!', error),
          () => {
              alert("Login post successful");
              this.router.navigateByUrl("/home");
          },
      );
  }

}

