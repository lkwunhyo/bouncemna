import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { DeleteContactService } from '../../services/delete-contact.service';
import { Person } from '../../models/person';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
var DeleteContactComponent = /** @class */ (function () {
    function DeleteContactComponent(router, formBuilder, _contactService, _deleteContactService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this._contactService = _contactService;
        this._deleteContactService = _deleteContactService;
        this.persons = [];
        this.selected_persons = [];
        this.deleteContactForm = this.formBuilder.group({
            deleteContact: new FormControl([])
        });
    }
    DeleteContactComponent.prototype.OnCheckboxSelect = function (person, status) {
        if (this.selected_persons.indexOf(person) === -1 && status) {
            this.selected_persons.push(person);
        }
        else if (!status) {
            var index = this.selected_persons.indexOf(person);
            this.selected_persons.splice(index, 1);
        }
        console.log(this.selected_persons);
    };
    DeleteContactComponent.prototype.onSubmit = function () {
        this.deleteContactForm = this.formBuilder.group({
            deleteContact: new FormControl(this.selected_persons)
        });
        console.log(this.deleteContactForm);
        // Submit every person where person.selected == true
        // Delete those from the database
        //var selectedIds = this.selected_persons.map(({ contactID }) => contactID);
        console.log("Delete Contact Form: " + JSON.stringify(this.deleteContactForm.value));
        //console.log(this.selected_persons.map(contact => contact.id));
        this._deleteContactService.deletecontacts(this.selected_persons.map(function (contact) { return contact.id; })).subscribe(function (data) { return console.log('Success!', data); }, function (error) { return console.error('Error!', error); });
        this.router.navigate(['/contact']);
    };
    DeleteContactComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.persons = this._contactService.filterBy();
        this._contactService.getContactList()
            .subscribe(function (res) {
            console.log(res);
            //this.persons = res;
            _this.persons = _this._contactService.filterBy(res);
        });
    };
    DeleteContactComponent.prototype.onSelect = function (person) {
        this.selectedPerson = person;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Person)
    ], DeleteContactComponent.prototype, "query", void 0);
    DeleteContactComponent = tslib_1.__decorate([
        Component({
            selector: 'app-delete-contact',
            templateUrl: './delete-contact.component.html',
            styleUrls: ['./delete-contact.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, FormBuilder, ContactService, DeleteContactService])
    ], DeleteContactComponent);
    return DeleteContactComponent;
}());
export { DeleteContactComponent };
//# sourceMappingURL=delete-contact.component.js.map