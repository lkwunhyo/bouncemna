import { Component, OnInit } from '@angular/core';
import { CalendarMomentDateFormatter } from 'angular-calendar';
import {FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AddEventsService } from '../../services/add-events.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})
export class AddEventsComponent implements OnInit {

  calForm: FormGroup;
  SERVER_URL = "http://localhost:8080/add-events";

  //Form state
  loading = false;
  success = false;


  constructor(private fb: FormBuilder, private httpClient: HttpClient, private _addeventsService:AddEventsService) { }

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

   

    // this.calForm.valueChanges.subscribe(console.log)
  }

 

  onSubmit(){
    console.log("this.calform value");
    console.log(this.calForm.getRawValue());
    this.loading = true;
    const formValue = this.calForm.value;

    this._addeventsService.addEvents(this.calForm.getRawValue()).subscribe( //this is json type
      alert => console.log('Success!', alert),
      error => console.error('Error!', error),
      () => console.log("onsubmit"),
  );
    

  }

}
