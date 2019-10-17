import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HEALTHINFO } from '../models/health-info_mock';
import { AppHttpService } from '../services/apphttp.service';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(http) {
        this.http = http;
        this.counter = 0;
        this.v = HEALTHINFO[0].info;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        setInterval(function () {
            _this.v = HEALTHINFO[_this.counter].info;
            _this.counter++;
            if (_this.counter >= HEALTHINFO.length) {
                _this.counter = 0;
            }
        }, 5000); //slightly less than 5 seconds
    };
    HomeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AppHttpService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map