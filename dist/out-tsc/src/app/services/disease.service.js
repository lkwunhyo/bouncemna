import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DISEASES } from '../models/disease_mock';
var DiseaseService = /** @class */ (function () {
    function DiseaseService() {
    }
    DiseaseService.prototype.getDiseases = function () {
        return DISEASES;
    };
    DiseaseService.prototype.filterBy = function () {
        var values = this.getDiseases();
        function orderByName(a, b) {
            if (a.disease < b.disease) {
                return -1;
            }
            if (a.disease > b.disease) {
                return 1;
            }
            return 0;
        }
        values.sort(orderByName);
        return values;
    };
    DiseaseService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], DiseaseService);
    return DiseaseService;
}());
export { DiseaseService };
//# sourceMappingURL=disease.service.js.map