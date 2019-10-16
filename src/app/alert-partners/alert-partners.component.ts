import { Component, OnInit } from '@angular/core';
import { alertPartnersModel } from '../models/alert-partners.model';
import { FormBuilder, FormGroup, Validators , FormArray, FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Person } from '../models/person';
import { PERSONS } from '../models/person_mock';
import { ContactService } from '../services/contact.service';

import { DiseaseService} from '../services/disease.service';
import { Disease } from '../models/disease.model';
import { DISEASES } from '../models/disease_mock';
import { AlertService } from '../services/alert.service';
import * as moment from 'moment';

import { LOCAL_STORAGE, SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Inject } from '@angular/core';  

//Should I put combine both forms into one? is data binded for submission?
@Component({
  selector: 'app-alert-partners',
  templateUrl: './alert-partners.component.html',
    styleUrls: ['./alert-partners.component.css'],
    providers: [DatePipe]
})
export class AlertPartnersComponent implements OnInit {
  alert: alertPartnersModel = new alertPartnersModel();
  alertPartnersForm1: FormGroup;
  alertPartnersForm2: FormGroup;
  hide = true;
  isSendMessage = true;
  isEditable = true;
  incomplete = "incomplete";
  diseases_db;
  persons = [];
  selected_persons = [];
  selectedPerson: Person;
  tracing_period;
  v = null;
  diseases = [];
  selectedDisease: Disease;
    sti = "sexually transmitted infection";
  constructor(private formBuilder: FormBuilder, private _contactService: ContactService,
      private _diseaseService: DiseaseService, private datePipe: DatePipe, private _alertService: AlertService,
      @Inject(SESSION_STORAGE) private storage: WebStorageService) {
      this.alertPartnersForm1 = this.formBuilder.group({
      });
      this.alertPartnersForm2 = this.formBuilder.group({
      });
    }



  OnCheckboxSelect(person, status:boolean) {
    if (this.selected_persons.indexOf(person) === -1 && status) {
      this.selected_persons.push(person);
    }
    else if(!status) {
      let index = this.selected_persons.indexOf(person);
      this.selected_persons.splice(index, 1);
    }
    console.log(this.selected_persons);
    
  }
  


    ngOnInit() {
        this._alertService.getDiseases()
            .subscribe((res: any[]) => {
                console.log(res);
                this.diseases_db = res;
            });

        
      this._contactService.getEncounterContacts()
          .subscribe((res: any[]) => {
              //console.log(res);
              this.persons = this._contactService.filterByDate(res,0,0);
          });
    this.diseases = this._diseaseService.filterBy();
    this.alertPartnersForm1 = this.formBuilder.group({
      'diagnosis': [this.alert.diagnosis, [
        Validators.required
        ]],
        'message': [this.alert.message = String(this.isSendMessage), [
            //Validators.required
        ]],
        'date': [this.alert.date, [
        ]],
    });

      this.alertPartnersForm2 = this.formBuilder.group({
          'contacts': [this.alert.contacts = this.selected_persons, [
        //Validators.requiredTrue
      ]],
      'anonymity': [this.alert.anonymity = 'anonymous', [
        //Validators.required
      ]]
    })
    }

    //stackoverflow.com/questions/34835516/how-to-submit-form-to-server-in-angular2
    onSubmit() {
        var contactid = [];
        for (var i = 0; i < this.selected_persons.length; i++) {
            contactid.push(this.selected_persons[i].contactID);
        }
        this.alertPartnersForm2.patchValue({ 'contacts': contactid });
        console.log("selected: ")
        console.log(this.selected_persons);
        console.log("form2 contacts: ");
        console.log(this.alertPartnersForm2.get('contacts').value);
        console.log("alert contact: ");
        console.log(this.alert.contacts);
        console.log("sendMessage: " + this.isSendMessage);
    /*
    alert('You may have been infected with ' + this.alert.diagnosis  + ', please get tested as soon as possible' + ' '
  + this.alert.anonymity + ' ' +  this.alert.contacts);*/
        //console.log("data form 1: " + JSON.stringify(this.alertPartnersForm1.value));
        //console.log("data form 2: " + JSON.stringify(this.alertPartnersForm2.value));
        //console.log(this.alert.date);
        console.log("alert details: " + this.alert.message);
        this.alert.message = this.alertPartnersForm1.value.message;
        this._alertService.alertpartners(this.alert).subscribe(
            alert => console.log('Success!', alert),
            error => console.error('Error!', error),
            () => console.log("onsubmit"),
        );
    } //

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }

    getTrace() { //Verifies disease by name, gets tracing period and contacts within it.
        try {
            
            if (this.alert.date != null) {//is this needed? already got "try"
                try {
                    for (let d of this.diseases_db) {
                        if (d.stiName === this.alert.diagnosis) {
                            this.tracing_period = d.numberOfMonths;
                            console.log(this.tracing_period);
                            //Get recent encounter contacts
                            this._contactService.getEncounterContacts()
                                .subscribe((res: any[]) => {
                                    //console.log(res);
                                    //res is persons
                                    this.persons = this._contactService.filterByDate(res, this.alert.date, this.tracing_period);
                                });
                        }
                    }
                } catch {
                    console.log("no valid diagnosis date");
                    this._contactService.getEncounterContacts()
                        .subscribe((res: any[]) => {
                            //console.log(res);
                            this.persons = this._contactService.filterByDate(res, 0, 0);
                        });
                }
            }
        } catch {
            console.log("no valid diagnosis date");
            this._contactService.getEncounterContacts()
                .subscribe((res: any[]) => {
                    this.persons = this._contactService.filterByDate(res, 0, 0);
                });
        }

    try {
      for (let dis of this.diseases){
        //console.log(this.alert.diagnosis === dis.name);
        if (this.alert.diagnosis === dis.name){
          this.v = dis.trace;        
        }
      }
    } catch {
      this.v = null;
    }

        if (this.alert.diagnosis === "HIV") {
            this.sti = "a sexually transmitted infection";
        } else {
            this.sti = this.alert.diagnosis;
        }

        var node;
        //conditional html
        try {
            if (this.alert.date != null) {
                if (this.persons.length > 0 && this.alert.diagnosis != "HIV") {
                    node = document.getElementById('recent_contacts');
                    node.style.visibility = 'visible';
                } else {
                    node = document.getElementById('recent_contacts');
                    node.style.visibility = 'hidden';
                }
            }
            if (this.persons.length < 0) {
                node = document.getElementById('no_recent_contacts');
                node.style.visibility = 'visible';
            } else {
                node = document.getElementById('no_recent_contacts');
                node.style.visibility = 'hidden';
            }
        } catch {
            //Can't think of any possible errors to catch
        }

    return this.v;
  }

  onChange(event) {   
    this.alertPartnersForm1.get(event.target.attributes.formcontrolname.value)
    .setValue(event.target.checked);
    this.alertPartnersForm2.get(event.target.attributes.formcontrolname.value)
          .setValue(event.target.checked);
    }

    sendMessage() {
        this.alertPartnersForm1.patchValue({ 'message': String(this.isSendMessage) });
        console.log("sendMessage(): " + this.alert.message);
        console.log("alertPartnersForm1: " + JSON.stringify(this.alertPartnersForm1.value));
    }

    formatDate() {
        //not working
        //this.alert.date = this.datePipe.transform(this.alert.date, 'MM-dd-yyyy');
        let newdateValue = moment(this.alertPartnersForm1.get('date').value).format("YYYY-MM-DD");
        //this.alertPartnersForm1.get('date').setValue(newdateValue);
        this.alert.date = newdateValue;
        console.log('alert.date: ' + this.alert.date);
    }

checkPartTwo(){
  console.log("checking")
  console.log(this.alert.contacts);
  if (!(this.alert.contacts === null || this.alert.anonymity === null)){
    this.incomplete = "Incomplete form";
  } else {
    this.incomplete = "";
  }
}

resetForm(){
  if(document.getElementById('no_recent_contacts')) {
    document.getElementById('no_recent_contacts').style.visibility = 'hidden';
  }
  if (document.getElementById('recent_contacts')) {
    document.getElementById('recent_contacts').style.visibility = 'hidden';;
  }
  

    this.v = null;
    console.log("reset: selected persons");
    this.alertPartnersForm1.reset();
    this.alertPartnersForm2.reset();
    this.alert = new alertPartnersModel();
    this.hide = true;
    this.isSendMessage = true;
    this.isEditable = true;
    this.incomplete = "incomplete";
    this.persons = [];
    this.selected_persons = [];
    this.selectedPerson = null;
    this.tracing_period = null;
    this.diseases = []; //mock
    this.selectedDisease = null;
    this.ngOnInit();
    console.log(this.selected_persons);
}




}
