import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var SearchPipe = /** @class */ (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (value, keys, term) {
        if (!term)
            return value;
        return (value || []).filter(function (item) { return keys.split(',').some(function (key) { return item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key]); }); });
    };
    SearchPipe = tslib_1.__decorate([
        Pipe({
            name: 'search'
        })
    ], SearchPipe);
    return SearchPipe;
}());
export { SearchPipe };
//# sourceMappingURL=search.pipe.js.map