import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Person } from '../models/person';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ContactFormService } from '../services/contact-form.service';
import { Router } from '@angular/router';
var ContactFormComponent = /** @class */ (function () {
    function ContactFormComponent(router, formBuilder, _contactFormService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this._contactFormService = _contactFormService;
        this.contact = new Person();
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.ages = [
            { value: 18, viewValue: 18 },
            { value: 19, viewValue: 19 },
            { value: 20, viewValue: 20 },
            { value: 21, viewValue: 21 },
            { value: 22, viewValue: 22 },
            { value: 23, viewValue: 23 },
            { value: 24, viewValue: 24 },
            { value: 25, viewValue: 25 },
            { value: 26, viewValue: 26 },
            { value: 27, viewValue: 27 },
            { value: 28, viewValue: 28 },
            { value: 29, viewValue: 29 },
            { value: 30, viewValue: 30 },
            { value: 31, viewValue: 31 },
            { value: 32, viewValue: 32 },
            { value: 33, viewValue: 33 },
            { value: 34, viewValue: 34 },
            { value: 35, viewValue: 35 },
            { value: 36, viewValue: 36 },
            { value: 37, viewValue: 37 },
            { value: 38, viewValue: 38 },
            { value: 39, viewValue: 39 },
            { value: 40, viewValue: 40 },
            { value: 41, viewValue: 51 },
            { value: 42, viewValue: 52 },
            { value: 43, viewValue: 53 },
            { value: 44, viewValue: 54 },
            { value: 45, viewValue: 55 },
            { value: 46, viewValue: 56 },
            { value: 47, viewValue: 57 },
            { value: 48, viewValue: 58 },
            { value: 49, viewValue: 59 },
            { value: 50, viewValue: 50 },
            { value: 61, viewValue: 61 },
            { value: 62, viewValue: 62 },
            { value: 63, viewValue: 63 },
            { value: 64, viewValue: 64 },
            { value: 65, viewValue: 65 },
            { value: 66, viewValue: 66 },
            { value: 67, viewValue: 67 },
            { value: 68, viewValue: 68 },
            { value: 69, viewValue: 69 },
            { value: 70, viewValue: 70 }
        ];
        this.contactForm = this.formBuilder.group({});
    }
    ContactFormComponent.prototype.ngOnInit = function () {
    };
    ContactFormComponent.prototype.onSubmit = function () {
        this.contactForm = this.formBuilder.group({
            //'id': this.contact.id,
            firstname: this.contact.firstname,
            lastname: this.contact.lastname,
            phone: this.contact.phone,
            email: this.contact.email,
            age: this.contact.age,
            gender: this.contact.gender,
            comment: this.contact.comment,
            rating: this.contact.rating
            // some other stuff
        });
        console.log("Contact Form: " + JSON.stringify(this.contactForm.value));
        this._contactFormService.addcontact(this.contact).subscribe(function (data) { return console.log('Success!', data); }, function (error) { return console.error('Error!', error); });
        this.router.navigate(['/contact']);
    };
    ContactFormComponent.prototype.getErrorMessage = function () {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    };
    ContactFormComponent = tslib_1.__decorate([
        Component({
            selector: 'app-contact-form',
            templateUrl: './contact-form.component.html',
            styleUrls: ['./contact-form.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, FormBuilder, ContactFormService])
    ], ContactFormComponent);
    return ContactFormComponent;
}());
export { ContactFormComponent };
//# sourceMappingURL=contact-form.component.js.map