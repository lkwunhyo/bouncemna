import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { WebStorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AddSexualService } from '../../services/add-sexual.service';
import { Router } from '@angular/router';
var AddSexualComponent = /** @class */ (function () {
    function AddSexualComponent(storage, router, formBuilder, _addSexualService) {
        this.storage = storage;
        this.router = router;
        this.formBuilder = formBuilder;
        this._addSexualService = _addSexualService;
        this.sexualactivity_list = [[1, "Vaginal"], [2, "Anal"], [3, "Oral"], [4, "Other"]]; //Should we use db or just store it here as a variable? db seems to be a hassle
        this.sexualactivity_value_list = [1, 2, 3, 4];
        this.contraceptive_list = [[1, "PrEP"], [2, "Condom"]];
        this.contraceptive_value_list = [1, 2];
        this.activities_performed = [];
        this.contraceptives_used = [];
        this.sexualpartners = [];
        this.sexualpartnerID = [];
        this.sexualActivityForm = this.formBuilder.group({});
    }
    AddSexualComponent.prototype.OnCheckboxSelect = function (item, array, status) {
        if (array.indexOf(item) === -1 && status) {
            array.push(item);
        }
        else if (!status) {
            var index = array.indexOf(item);
            array.splice(index, 1);
        }
        console.log(array);
    };
    AddSexualComponent.prototype.OnSubmit = function () {
        var date;
        date = new Date();
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) /* + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2)*/;
        this.sexualActivityForm = this.formBuilder.group({
            contactid: [this.sexualpartnerID],
            actid: [this.activities_performed],
            protid: [this.contraceptives_used],
            date: date,
            comment: this.comment
            // some other stuff
        });
        console.log("Activity Form: " + JSON.stringify(this.sexualActivityForm.value));
        this._addSexualService.addactivity(this.sexualActivityForm.value).subscribe(function (data) { return console.log('Success!', data); }, function (error) { return console.error('Error!', error); });
        //this.router.navigate(['/sexualhistory']);
    };
    AddSexualComponent.prototype.getFromSession = function () {
        var _this = this;
        // Get from Session Storage
        //this.sexualpartners = Object.values(this.storage);
        var values = Object.values(this.storage);
        //this.sexualpartners = Object.values(values[0]);
        var keys = Object.keys(values[0]);
        console.log("keys:" + keys);
        this.sexualpartners = keys.map(function (key) { return _this.storage.get(key); });
        this.sexualpartnerID = keys;
        console.log("partners below: ");
        console.log(this.sexualpartners);
    };
    AddSexualComponent.prototype.ngOnInit = function () {
        this.getFromSession();
    };
    AddSexualComponent = tslib_1.__decorate([
        Component({
            selector: 'app-add-sexual',
            templateUrl: './add-sexual.component.html',
            styleUrls: ['./add-sexual.component.css']
        }),
        tslib_1.__param(0, Inject(SESSION_STORAGE)),
        tslib_1.__metadata("design:paramtypes", [WebStorageService, Router,
            FormBuilder, AddSexualService])
    ], AddSexualComponent);
    return AddSexualComponent;
}());
export { AddSexualComponent };
//# sourceMappingURL=add-sexual.component.js.map