import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Person } from '../../../models/person';
import { ContactService } from '../../../services/contact.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Inject } from '@angular/core';
var AddPartnerComponent = /** @class */ (function () {
    function AddPartnerComponent(_contactService, storage) {
        this._contactService = _contactService;
        this.storage = storage;
        this.contactlist = [];
        this.persons = [];
        this.selected_persons = [];
    }
    ;
    AddPartnerComponent.prototype.OnCheckboxSelect = function (person, status) {
        if (this.selected_persons.indexOf(person) === -1 && status) {
            this.selected_persons.push(person);
        }
        else if (!status) {
            var index = this.selected_persons.indexOf(person);
            this.selected_persons.splice(index, 1);
        }
        console.log(this.selected_persons);
    };
    AddPartnerComponent.prototype.OnSubmit = function () {
        // Submit every person where person.selected == true
        console.log("length of selected: " + this.selected_persons.length);
        for (var i = 0; i < this.selected_persons.length; i++) {
            //storage already checks if object is not in storage, then add. Thus no duplicate
            console.log("selected person contactID/KEY " + this.selected_persons[i].contactID);
            this.storage.set(this.selected_persons[i].contactID, this.selected_persons[i]);
            console.log("storage get value from key:" + this.storage.get(this.selected_persons[i].contactID).firstname);
        }
        //storage keeps item in "key,value(object)" pair
    };
    AddPartnerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._contactService.getContactList()
            .subscribe(function (res) {
            console.log("res: " + res);
            //this.persons = res;
            _this.persons = _this._contactService.filterBy(res);
        });
        console.dir(this.persons);
    };
    AddPartnerComponent.prototype.onSelect = function (person) {
        this.selectedPerson = person;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Person)
    ], AddPartnerComponent.prototype, "query", void 0);
    AddPartnerComponent = tslib_1.__decorate([
        Component({
            selector: 'app-add-partner',
            templateUrl: './add-partner.component.html',
            styleUrls: ['./add-partner.component.css']
        }),
        tslib_1.__param(1, Inject(SESSION_STORAGE)),
        tslib_1.__metadata("design:paramtypes", [ContactService, WebStorageService])
    ], AddPartnerComponent);
    return AddPartnerComponent;
}());
export { AddPartnerComponent };
//# sourceMappingURL=add-partner.component.js.map