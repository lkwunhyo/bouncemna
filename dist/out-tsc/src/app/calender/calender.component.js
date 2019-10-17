import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarView } from 'angular-calendar';
import { AddEventsService } from '../services/add-events.service';
import { setHours, setMinutes } from 'date-fns';
var colors = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};
var CalenderComponent = /** @class */ (function () {
    function CalenderComponent(modal, _addeventsService) {
        this.modal = modal;
        this._addeventsService = _addeventsService;
        this.eventList = [];
        this.view = CalendarView.Day;
        this.CalendarView = CalendarView;
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
    }
    CalenderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._addeventsService.getEventsList()
            .subscribe(function (res) {
            console.log("res: " + res);
            //this.eventList = this._addeventsService.getEvents();
            _this.eventList = res;
            console.log(_this.eventList);
            _this.eventsname = _this.eventList.title;
            _this.eventsl[0].title = _this.eventsname;
            console.log(_this.eventsl[0].title);
            console.log(_this.eventList[0].title);
            _this.eventsname = "hello";
        });
        //console.log(this.eventList);
        this.eventsl = [
            {
                title: this.eventsname,
                start: setHours(setMinutes(new Date(), 0), 3),
                color: colors.blue
            },
            {
                title: 'No event end date',
                start: setHours(setMinutes(new Date(), 0), 5),
                color: colors.yellow
            }
        ];
    };
    CalenderComponent.prototype.gettitle = function () {
        this.eventsname = this.eventList.title;
        return this.eventsname;
    };
    // ------------------------TO SET EVENTS OR EVENTS ARRAY LIST-------------------------
    /*
      eventsl: CalendarEvent<any>[] = [
        {
          title: this.eventsname,
          start: setHours(setMinutes(new Date(), 0), 3),
          color: colors.blue
        },
        {
          title: 'No event end date',
          start: setHours(setMinutes(new Date(), 0), 5),
          color: colors.yellow
        }
      ];
      
      onSelect(events: events): void {
        this.selectedEvents = events;
      }*/
    // ----------------------------To check active day for viewing---------------------------
    CalenderComponent.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        if (isSameMonth(date, this.viewDate)) {
            this.viewDate = date;
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
            }
        }
    };
    CalenderComponent.prototype.setView = function (view) {
        this.view = view;
    };
    CalenderComponent.prototype.closeOpenMonthViewDay = function () {
        this.activeDayIsOpen = false;
    };
    CalenderComponent = tslib_1.__decorate([
        Component({
            selector: 'app-calender',
            templateUrl: './calender.component.html',
            styleUrls: ['./calender.component.css',],
        }),
        tslib_1.__metadata("design:paramtypes", [NgbModal, AddEventsService])
    ], CalenderComponent);
    return CalenderComponent;
}());
export { CalenderComponent };
//# sourceMappingURL=calender.component.js.map