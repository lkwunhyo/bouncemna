import { Component, OnInit } from '@angular/core';
import { CalendarMomentDateFormatter } from 'angular-calendar';
import {FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})
export class AddEventsComponent implements OnInit {

  calForm: FormGroup;

  //Form state
  loading = false;
  success = false;


  constructor(private fb: FormBuilder) { }

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

  async submitHandler(){
    this.loading = true;
    const formValue = this.calForm;

  }

}
