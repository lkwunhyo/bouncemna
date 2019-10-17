import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var DiagnosisHistoryComponent = /** @class */ (function () {
    function DiagnosisHistoryComponent() {
        this.displayedColumns = ['startdate', 'diagnosis', 'abstinencedate'];
        this.dataSource = DIAGNOSIS_DATA;
    }
    DiagnosisHistoryComponent.prototype.ngOnInit = function () {
    };
    DiagnosisHistoryComponent = tslib_1.__decorate([
        Component({
            selector: 'app-diagnosis-history',
            templateUrl: './diagnosis-history.component.html',
            styleUrls: ['./diagnosis-history.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], DiagnosisHistoryComponent);
    return DiagnosisHistoryComponent;
}());
export { DiagnosisHistoryComponent };
var DIAGNOSIS_DATA = [
    { startdate: '12/05/2019', diagnosis: 'Gonorrhoea', enddate: '12/11/2019', abstinencedate: '12/03/2020' },
    { startdate: '12/05/2015', diagnosis: 'Chlamydia', enddate: '12/11/2016', abstinencedate: '12/03/2017' },
    { startdate: '12/05/2012', diagnosis: 'Genital Herpes', enddate: '12/11/2013', abstinencedate: '12/03/2014' },
    { startdate: '12/05/2011', diagnosis: 'Genital Warts', enddate: '12/11/2012', abstinencedate: '12/03/2012' },
    { startdate: '12/05/2010', diagnosis: 'Syphilis', enddate: '12/11/2019', abstinencedate: '12/03/2011' },
    { startdate: '12/05/2007', diagnosis: 'Hepatitis B', enddate: '12/11/2016', abstinencedate: '12/03/2008' },
    { startdate: '12/05/2002', diagnosis: 'AIDS', enddate: '12/11/2013', abstinencedate: '12/03/2003' },
    { startdate: '12/05/2000', diagnosis: 'HIV', enddate: '12/11/2012', abstinencedate: '12/03/2001' }
];
//# sourceMappingURL=diagnosis-history.component.js.map