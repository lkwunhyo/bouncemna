import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AppHttpService } from '../services/apphttp.service';
import { Router } from "@angular/router";
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, _apphttpService, router) {
        this.formBuilder = formBuilder;
        this._apphttpService = _apphttpService;
        this.router = router;
        this.user = new LoginModel();
        this.hide = true;
        this._url = '//localhost:8080/login';
    }
    LoginComponent.prototype.ngOnInit = function () {
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
    };
    LoginComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        this._apphttpService.post(this._url, this.user).subscribe(function (registration) {
            console.log('Success!', registration);
            _this.reg = registration;
        }, function (error) { return console.error('Error!', error); }, function () {
            if (_this.reg.status == true) {
                alert("Login post successful");
                _this.router.navigateByUrl("/home");
            }
            else {
                alert(_this.reg.message);
            }
        });
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, AppHttpService,
            Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map