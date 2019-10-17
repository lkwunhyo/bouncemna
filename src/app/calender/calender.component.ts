import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView} from 'angular-calendar';
import { events } from '../models/events';
import { PERSONS } from '../models/person_mock';
import { AddEventsService } from '../services/add-events.service';
import { GetEventsService } from '../services/getEvents.service';
import { setHours, setMinutes } from 'date-fns';
import { dateToLocalArray } from '@fullcalendar/core/datelib/marker';

const colors: any = {
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



@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css',],
  
})


export class CalenderComponent implements OnInit {

  public eventList = <any>[];
  constructor(private modal: NgbModal , private _addeventsService: GetEventsService) {}
  //events = [];
  selectedEvents: events;
  eventsname: string;
  view: CalendarView = CalendarView.Day;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;
  eventsl: CalendarEvent<any>[];
  
  
  ngOnInit() {
    this._addeventsService.getEventsList()
          .subscribe((res: any[]) => {
              //console.log("res: " + res.length);
              //this.eventList = this._addeventsService.getEvents();
              this.eventList = res;
              console.log("resE" + this.eventList);
              this.eventsname = this.eventList[0].title;
              
              console.log(this.eventsname);
              //console.log("Date:" + this.eventList[0].date);
              //console.log("Time: " + this.eventList[7].timestart);


              this.eventsl = [
               
                {
                  title: this.eventsname,
                  start: setHours(setMinutes(new Date(), 0), this.eventList[0].timestart),
                  color: colors.blue
                },
                {
                  title: '1No event end date',
                  start: setHours(setMinutes(new Date(), 0), 5),
                  color: colors.yellow
                }


              ];

             

          });
  
  
        }



  /*gettitle(){
    this.eventsname = this.eventList.title;
    return this.eventsname;
  }*/

 
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

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

 
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}


