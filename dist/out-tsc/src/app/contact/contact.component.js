import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Person } from '../models/person';
import { ContactService } from '../services/contact.service';
var ContactComponent = /** @class */ (function () {
    function ContactComponent(_contactService) {
        this._contactService = _contactService;
        this.contactlist = [];
        this.persons = [];
    }
    ;
    ContactComponent.prototype.ngOnInit = function () {
        var _this = this;
        /*this.persons = this._contactService.filterBy();*/
        this._contactService.getContactList()
            .subscribe(function (res) {
            console.log(res);
            _this.contactlist = _this._contactService.filterBy(res);
        });
    };
    ContactComponent.prototype.onSelect = function (person) {
        this.selectedPerson = person;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Person)
    ], ContactComponent.prototype, "query", void 0);
    ContactComponent = tslib_1.__decorate([
        Component({
            selector: 'app-contact',
            templateUrl: './contact.component.html',
            styleUrls: ['./contact.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ContactService])
    ], ContactComponent);
    return ContactComponent;
}());
export { ContactComponent };
//# sourceMappingURL=contact.component.js.map