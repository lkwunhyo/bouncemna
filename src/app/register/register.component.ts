import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
user: RegisterModel = new RegisterModel();
registerForm: FormGroup;
hide = true;

constructor(private formBuilder: FormBuilder) { }

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
      ]]
    });
  }

  onRegisterSubmit() {
    alert(this.user.firstname + ' ' + this.user.email + ' ' + this.user.password + '' + this.user.gender);
  }

}
