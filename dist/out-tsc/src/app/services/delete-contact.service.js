import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
var DeleteContactService = /** @class */ (function () {
    function DeleteContactService(router, _http) {
        var _this = this;
        this.router = router;
        this._http = _http;
        this.subject = new Subject();
        this.keepAfterNavigationChange = false;
        this._url = 'http://localhost:8080/deletecontact';
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
    DeleteContactService.prototype.deletecontacts = function (contacts) {
        return this._http.post(this._url, contacts);
    };
    DeleteContactService.prototype.success = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    };
    DeleteContactService.prototype.error = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    };
    DeleteContactService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    DeleteContactService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Router, HttpClient])
    ], DeleteContactService);
    return DeleteContactService;
}());
export { DeleteContactService };
//# sourceMappingURL=delete-contact.service.js.map