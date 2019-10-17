import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
var AlertService = /** @class */ (function () {
    function AlertService(router, _http) {
        var _this = this;
        this.router = router;
        this._http = _http;
        this.subject = new Subject();
        this.keepAfterNavigationChange = false;
        this._url = 'http://localhost:8080/alertpartners';
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
    AlertService.prototype.alertpartners = function (alert) {
        console.dir("called service");
        //console.dir("json: " + JSON.stringify(alert));
        console.dir("alert.diagnosis: " + alert.diagnosis);
        return this._http.post(this._url, alert);
    };
    AlertService.prototype.success = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    };
    AlertService.prototype.error = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    };
    AlertService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    AlertService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [Router, HttpClient])
    ], AlertService);
    return AlertService;
}());
export { AlertService };
//# sourceMappingURL=alert.service.js.map