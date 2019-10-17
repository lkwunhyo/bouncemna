import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AppHttpService } from '../services/apphttp.service';
import { Router } from "@angular/router";
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(formBuilder, _apphttpService, router) {
        this.formBuilder = formBuilder;
        this._apphttpService = _apphttpService;
        this.router = router;
        this.user = new RegisterModel();
        this.hide = true;
        this._url = '//localhost:8080/register';
    }
    RegisterComponent.prototype.ngOnInit = function () {
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
    };
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        this.credentials = {
            first_name: this.user.firstname,
            last_name: this.user.lastname,
            email: this.user.email,
            gender: this.user.gender,
        };
        this._apphttpService.post(this._url, this.user).subscribe(function (registration) { return console.log('Success!', registration); }, function (error) { return console.error('Error!', error); }, function () {
            alert("Registration successful");
            _this.router.navigateByUrl("/login");
        });
    };
    RegisterComponent = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, AppHttpService,
            Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map