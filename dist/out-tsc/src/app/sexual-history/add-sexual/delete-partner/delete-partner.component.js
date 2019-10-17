import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Person } from '../../../models/person';
import { ContactService } from '../../../services/contact.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Inject } from '@angular/core';
var DeletePartnerComponent = /** @class */ (function () {
    function DeletePartnerComponent(_contactService, storage) {
        this._contactService = _contactService;
        this.storage = storage;
        this.persons = [];
        this.selected_persons = [];
    }
    ;
    DeletePartnerComponent.prototype.OnCheckboxSelect = function (person, status) {
        if (this.selected_persons.indexOf(person) === -1 && status) {
            this.selected_persons.push(person);
        }
        else if (!status) {
            var index = this.selected_persons.indexOf(person);
            this.selected_persons.splice(index, 1);
        }
        console.log(this.selected_persons);
    };
    DeletePartnerComponent.prototype.OnSubmit = function () {
        // Submit every person where person.selected == true
        var values = Object.values(this.storage);
        var keys = this.selected_persons.map(function (person) { return person.id; });
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            this.storage.remove(key);
        }
        console.log(this.storage);
    };
    DeletePartnerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._contactService.getContactList()
            .subscribe(function (res) {
            console.log(res);
            _this.persons = _this._contactService.filterBy(res);
        });
        //this.persons = this._contactService.filterBy();
    };
    DeletePartnerComponent.prototype.onSelect = function (person) {
        this.selectedPerson = person;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Person)
    ], DeletePartnerComponent.prototype, "query", void 0);
    DeletePartnerComponent = tslib_1.__decorate([
        Component({
            selector: 'app-delete-partner',
            templateUrl: './delete-partner.component.html',
            styleUrls: ['./delete-partner.component.css']
        }),
        tslib_1.__param(1, Inject(SESSION_STORAGE)),
        tslib_1.__metadata("design:paramtypes", [ContactService, WebStorageService])
    ], DeletePartnerComponent);
    return DeletePartnerComponent;
}());
export { DeletePartnerComponent };
//# sourceMappingURL=delete-partner.component.js.map