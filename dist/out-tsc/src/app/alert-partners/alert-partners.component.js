import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { alertPartnersModel } from '../models/alert-partners.model';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ContactService } from '../services/contact.service';
import { DiseaseService } from '../services/disease.service';
import { AlertService } from '../services/alert.service';
import * as moment from 'moment';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Inject } from '@angular/core';
//Should I put combine both forms into one? is data binded for submission?
var AlertPartnersComponent = /** @class */ (function () {
    function AlertPartnersComponent(formBuilder, _contactService, _diseaseService, datePipe, _alertService, storage) {
        this.formBuilder = formBuilder;
        this._contactService = _contactService;
        this._diseaseService = _diseaseService;
        this.datePipe = datePipe;
        this._alertService = _alertService;
        this.storage = storage;
        this.alert = new alertPartnersModel();
        this.hide = true;
        this.isSendMessage = true;
        this.isEditable = true;
        this.incomplete = "incomplete";
        this.persons = [];
        this.selected_persons = [];
        this.v = null;
        this.diseases = [];
        this.alertPartnersForm1 = this.formBuilder.group({});
        this.alertPartnersForm2 = this.formBuilder.group({});
    }
    AlertPartnersComponent.prototype.OnCheckboxSelect = function (person, status) {
        if (this.selected_persons.indexOf(person) === -1 && status) {
            this.selected_persons.push(person);
        }
        else if (!status) {
            var index = this.selected_persons.indexOf(person);
            this.selected_persons.splice(index, 1);
        }
        console.log(this.selected_persons);
    };
    AlertPartnersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._contactService.getContactList()
            .subscribe(function (res) {
            //console.log(res);
            _this.persons = _this._contactService.filterBy(res);
        });
        this.diseases = this._diseaseService.filterBy();
        this.alertPartnersForm1 = this.formBuilder.group({
            'diagnosis': [this.alert.diagnosis, [
                    Validators.required
                ]],
            'message': [this.alert.message = String(this.isSendMessage), [
                //Validators.required
                ]],
            'date': [this.alert.date, []],
        });
        this.alertPartnersForm2 = this.formBuilder.group({
            'contacts': [this.alert.contacts = this.selected_persons, [
                //Validators.requiredTrue
                ]],
            'anonymity': [this.alert.anonymity = 'anonymous', [
                //Validators.required
                ]]
        });
    };
    //stackoverflow.com/questions/34835516/how-to-submit-form-to-server-in-angular2
    AlertPartnersComponent.prototype.onSubmit = function () {
        var contactid = [];
        for (var i = 0; i < this.selected_persons.length; i++) {
            contactid.push(this.selected_persons[i].contactID);
        }
        this.alertPartnersForm2.patchValue({ 'contacts': contactid });
        console.log("selected: ");
        console.log(this.selected_persons);
        console.log("form2 contacts: ");
        console.log(this.alertPartnersForm2.get('contacts').value);
        console.log("alert contact: ");
        console.log(this.alert.contacts);
        /*
        alert('You may have been infected with ' + this.alert.diagnosis  + ', please get tested as soon as possible' + ' '
      + this.alert.anonymity + ' ' +  this.alert.contacts);*/
        //console.log("data form 1: " + JSON.stringify(this.alertPartnersForm1.value));
        //console.log("data form 2: " + JSON.stringify(this.alertPartnersForm2.value));
        //console.log(this.alert.date);
        this._alertService.alertpartners(this.alert).subscribe(function (alert) { return console.log('Success!', alert); }, function (error) { return console.error('Error!', error); }, function () { return console.log("onsubmit"); });
    }; //
    AlertPartnersComponent.prototype.onSelect = function (person) {
        this.selectedPerson = person;
    };
    AlertPartnersComponent.prototype.getTrace = function () {
        try {
            for (var _i = 0, _a = this.diseases; _i < _a.length; _i++) {
                var dis = _a[_i];
                //console.log(this.alert.diagnosis === dis.name);
                if (this.alert.diagnosis === dis.name) {
                    this.v = dis.trace;
                }
            }
        }
        catch (_b) {
            this.v = null;
        }
        return this.v;
    };
    AlertPartnersComponent.prototype.onChange = function (event) {
        this.alertPartnersForm1.get(event.target.attributes.formcontrolname.value)
            .setValue(event.target.checked);
        this.alertPartnersForm2.get(event.target.attributes.formcontrolname.value)
            .setValue(event.target.checked);
    };
    AlertPartnersComponent.prototype.sendMessage = function () {
        this.alertPartnersForm1.patchValue({ 'message': String(this.isSendMessage) });
    };
    AlertPartnersComponent.prototype.formatDate = function () {
        //not working
        //this.alert.date = this.datePipe.transform(this.alert.date, 'MM-dd-yyyy');
        var newdateValue = moment(this.alertPartnersForm1.get('date').value).format("DD-MM-YYYY");
        //this.alertPartnersForm1.get('date').setValue(newdateValue);
        this.alert.date = newdateValue;
        console.log('alert.date: ' + this.alert.date);
    };
    AlertPartnersComponent.prototype.checkPartTwo = function () {
        console.log("checking");
        console.log(this.alert.contacts);
        if (!(this.alert.contacts === null || this.alert.anonymity === null)) {
            this.incomplete = "Incomplete form";
        }
        else {
            this.incomplete = "";
        }
    };
    AlertPartnersComponent.prototype.resetForm = function () {
        this.v = null;
    };
    AlertPartnersComponent = tslib_1.__decorate([
        Component({
            selector: 'app-alert-partners',
            templateUrl: './alert-partners.component.html',
            styleUrls: ['./alert-partners.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__param(5, Inject(SESSION_STORAGE)),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, ContactService,
            DiseaseService, DatePipe, AlertService,
            WebStorageService])
    ], AlertPartnersComponent);
    return AlertPartnersComponent;
}());
export { AlertPartnersComponent };
//# sourceMappingURL=alert-partners.component.js.map