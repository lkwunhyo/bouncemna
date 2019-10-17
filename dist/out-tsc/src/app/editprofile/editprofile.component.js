import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { RegisterModel } from '../models/register.model';
var EditprofileComponent = /** @class */ (function () {
    function EditprofileComponent() {
        this.editprofileForm = new RegisterModel();
    }
    EditprofileComponent.prototype.ngOnInit = function () {
    };
    EditprofileComponent = tslib_1.__decorate([
        Component({
            selector: 'app-editprofile',
            templateUrl: './editprofile.component.html',
            styleUrls: ['./editprofile.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], EditprofileComponent);
    return EditprofileComponent;
}());
export { EditprofileComponent };
//# sourceMappingURL=editprofile.component.js.map