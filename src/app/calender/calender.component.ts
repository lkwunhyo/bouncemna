import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { events } from '../models/events';
import { PERSONS } from '../models/person_mock';
import { EventsService } from '../services/events.service';
import { setHours, setMinutes } from 'date-fns';

// Calendar events button
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

  private eventList = <any>[];
  constructor(private modal: NgbModal, private eventsService: EventsService) { }

  selectedEvents: events;
  eventsname: string;
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  eventsl: CalendarEvent<any>[];


  ngOnInit() {
    console.log("geteventslist")
    this.eventsService.getEventsList()
      .subscribe((res: any[]) => {
        console.log(res);

        //Gets events from the database
        this.eventList = res;

        //Loop through the events from database and print it out to the front end
        for (let count of this.eventList) {
          try {
            this.eventsl = [
              ...this.eventsl,
              {
                title: count.title + " - " + count.timestart + ":" + count.timeend,
                start: setHours(setMinutes(count.date, count.timeend), count.timestart),
                color: colors.blue
              },
            ];
          } catch {
            this.eventsl = [
              {
                title: count.title + " - " + count.timestart + ":" + count.timeend,
                start: setHours(setMinutes(count.date, count.timeend), count.timestart),
                color: colors.blue
              },
            ];
          }
        }
      });
  }



  // ----------------------------To check active day for viewing---------------------------

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {

      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      console.log(this.viewDate);
    }
  }


  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}


