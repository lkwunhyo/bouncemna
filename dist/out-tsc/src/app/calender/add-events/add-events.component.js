import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AddEventsService } from '../../services/add-events.service';
var AddEventsComponent = /** @class */ (function () {
    function AddEventsComponent(fb, httpClient, _addeventsService) {
        this.fb = fb;
        this.httpClient = httpClient;
        this._addeventsService = _addeventsService;
        this.SERVER_URL = "http://localhost:8080/add-events";
        //Form state
        this.loading = false;
        this.success = false;
    }
    AddEventsComponent.prototype.ngOnInit = function () {
        this.calForm = this.fb.group({
            title: '',
            date: '',
            timestart: '',
            timeend: '',
            alert: '',
            repeat: '',
            note: ''
        });
        // this.calForm.valueChanges.subscribe(console.log)
    };
    AddEventsComponent.prototype.onSubmit = function () {
        console.log("this.calform value");
        console.log(this.calForm.getRawValue());
        this.loading = true;
        var formValue = this.calForm.value;
        this._addeventsService.addEvents(this.calForm.getRawValue()).subscribe(//this is json type
        function (//this is json type
        alert) { return console.log('Success!', alert); }, function (error) { return console.error('Error!', error); }, function () { return console.log("onsubmit"); });
    };
    AddEventsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-add-events',
            templateUrl: './add-events.component.html',
            styleUrls: ['./add-events.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, HttpClient, AddEventsService])
    ], AddEventsComponent);
    return AddEventsComponent;
}());
export { AddEventsComponent };
//# sourceMappingURL=add-events.component.js.map