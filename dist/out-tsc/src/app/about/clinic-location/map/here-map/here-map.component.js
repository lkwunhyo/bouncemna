import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
var HereMapComponent = /** @class */ (function () {
    function HereMapComponent() {
    }
    HereMapComponent.prototype.ngOnInit = function () { };
    HereMapComponent.prototype.ngAfterViewInit = function () {
        var platform = new H.service.Platform({
            "app_id": this.appId,
            "app_code": this.appCode
        });
        var defaultLayers = platform.createDefaultLayers();
        var map = new H.Map(this.mapElement.nativeElement, defaultLayers.normal.map, {
            zoom: 10,
            center: { lat: this.lat, lng: this.lng }
        });
    };
    tslib_1.__decorate([
        ViewChild("map"),
        tslib_1.__metadata("design:type", ElementRef)
    ], HereMapComponent.prototype, "mapElement", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], HereMapComponent.prototype, "appId", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], HereMapComponent.prototype, "appCode", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], HereMapComponent.prototype, "lat", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], HereMapComponent.prototype, "lng", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], HereMapComponent.prototype, "width", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], HereMapComponent.prototype, "height", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], HereMapComponent.prototype, "zoom", void 0);
    HereMapComponent = tslib_1.__decorate([
        Component({
            selector: 'app-here-map',
            templateUrl: './here-map.component.html',
            styleUrls: ['./here-map.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], HereMapComponent);
    return HereMapComponent;
}());
export { HereMapComponent };
//# sourceMappingURL=here-map.component.js.map