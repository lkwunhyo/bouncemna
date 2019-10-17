import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { PERSONS } from '../models/person_mock';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../services/message.service';
var ContactService = /** @class */ (function () {
    function ContactService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
        this.url_contact = 'http://localhost:8080/contact'; // URL to web api
    }
    ContactService.prototype.getContacts = function () {
        return PERSONS;
    };
    ContactService.prototype.filterBy = function (values) {
        function orderByName(a, b) {
            if (a.firstname < b.firstname) {
                return -1;
            }
            if (a.firstname > b.firstname) {
                return 1;
            }
            return 0;
        }
        values.sort(orderByName);
        return values;
    };
    /** GET heroes from the server */
    ContactService.prototype.getContactList = function () {
        console.dir("calling POST service");
        return this.http.post(this.url_contact, "BODY 2ND PARAM");
    };
    ContactService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, MessageService])
    ], ContactService);
    return ContactService;
}());
export { ContactService };
//# sourceMappingURL=contact.service.js.map