import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
//TRY HTTPCLIENT
var AppHttpService = /** @class */ (function () {
    function AppHttpService(http, _http) {
        this.http = http;
        this._http = _http;
    }
    AppHttpService.prototype.post = function (url, data) {
        console.dir("called post service");
        //console.dir("json: " + JSON.stringify(alert));
        return this._http.post(url, data);
    };
    AppHttpService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Http, HttpClient])
    ], AppHttpService);
    return AppHttpService;
}());
export { AppHttpService };
//# sourceMappingURL=apphttp.service.js.map