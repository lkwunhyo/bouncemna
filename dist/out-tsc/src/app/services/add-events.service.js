import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { events } from '../models/events';
var AddEventsService = /** @class */ (function () {
    function AddEventsService(router, _http) {
        var _this = this;
        this.router = router;
        this._http = _http;
        this.subject = new Subject();
        this.keepAfterNavigationChange = false;
        this._url = 'http://localhost:8080/addevents';
        // clear alert message on route change
        router.events.subscribe(function (event) {
            if (event instanceof NavigationStart) {
                if (_this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    _this.keepAfterNavigationChange = false;
                }
                else {
                    // clear alert
                    _this.subject.next();
                }
            }
        });
    }
    AddEventsService.prototype.getEvents = function () {
        return events;
    };
    AddEventsService.prototype.addEvents = function (calForm) {
        console.dir("called addevents service");
        console.dir("json: " + JSON.stringify(calForm));
        console.dir("calForm: " + calForm);
        return this._http.post(this._url, calForm);
    };
    AddEventsService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    /** GET heroes from the server */
    AddEventsService.prototype.getEventsList = function () {
        console.dir("calling POST service");
        return this._http.post(this._url, "BODY 2ND PARAM");
    };
    AddEventsService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [Router, HttpClient])
    ], AddEventsService);
    return AddEventsService;
}());
export { AddEventsService };
//# sourceMappingURL=add-events.service.js.map