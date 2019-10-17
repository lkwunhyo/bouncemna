import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
var AddSexualService = /** @class */ (function () {
    function AddSexualService(router, _http) {
        var _this = this;
        this.router = router;
        this._http = _http;
        this.subject = new Subject();
        this.keepAfterNavigationChange = false;
        this._url = 'http://localhost:8080/addactivity';
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
    AddSexualService.prototype.addactivity = function (activity) {
        return this._http.post(this._url, activity);
    };
    AddSexualService.prototype.success = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    };
    AddSexualService.prototype.error = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    };
    AddSexualService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    AddSexualService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Router, HttpClient])
    ], AddSexualService);
    return AddSexualService;
}());
export { AddSexualService };
//# sourceMappingURL=add-sexual.service.js.map