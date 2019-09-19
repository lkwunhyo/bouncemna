import { Component, OnInit } from '@angular/core';
import { CalendarMomentDateFormatter } from 'angular-calendar';
import {FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {AddEventsService} from '../services/add-events.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})
export class AddEventsComponent implements OnInit {

  calForm: FormGroup;
  SERVER_URL = "http://localhost:300/add-events";

  //Form state
  loading = false;
  success = false;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }

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

    this.calForm.valueChanges.subscribe(console.log)
  }

  // async submitHandler(){
  //   this.loading = true;
  //   const formValue = this.calForm.value;

  //   try {
  //     await this.afs.collection('contacts').add(formValue);
  //       } catch(err){

  //   }

  // }

}
