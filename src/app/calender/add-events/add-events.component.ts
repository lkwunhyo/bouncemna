import { Component, OnInit } from '@angular/core';
import { CalendarMomentDateFormatter } from 'angular-calendar';
import {FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})
export class AddEventsComponent implements OnInit {

  calForm: FormGroup;
  add_events_url = "/add-events";

  //Form state
  loading = false;
  success = false;


    constructor(private fb: FormBuilder, private httpClient: HttpClient, private eventsService: EventsService) { }

  ngOnInit() {

    this.calForm = this.fb.group({
      title: '',
      date: '',
      timestart: '',
      timeend: '',
      alert: '',
      repeat: '',
      note: ''
    });

  }

 

  onSubmit(){
    console.log("this.calform value");
    console.log(this.calForm.getRawValue());
    this.loading = true;
    const formValue = this.calForm.value;

    this.eventsService.addEvents(this.calForm.getRawValue()).subscribe( //this is json type
      alert => console.log('Success!', alert),
      error => console.error('Error!', error),
      () => console.log("onsubmit"),
  );
  location.replace("/calender");
    

  }

}
