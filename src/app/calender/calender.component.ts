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
              
              this.eventList = res;
              console.log("resE" + this.eventList);

               this.eventsl = [
                {
                  title: 'EXAMPLE',
                  start: setHours(setMinutes(new Date(), 0), 5),
                  color: colors.yellow
                }
              ];

              for (let count of this.eventList){
                
              this.eventsl = [
               ...this.eventsl,
                {
                  title: count.title,
                  start: setHours(setMinutes(count.date, count.timeend), count.timestart),
                  color: colors.blue
                },
               
              ];

            }

          });
  
  
        }



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


