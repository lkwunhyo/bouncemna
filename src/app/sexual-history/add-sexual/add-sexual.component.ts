import { Component, OnInit } from '@angular/core';
import { WebStorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { Inject } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AddSexualService } from '../../services/add-sexual.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-add-sexual',
  templateUrl: './add-sexual.component.html',
  styleUrls: ['./add-sexual.component.css']
})
export class AddSexualComponent implements OnInit {

  sexualActivityForm: FormGroup;

    sexualactivity_list = [[1,"Vaginal"], [2,"Anal"], [3,"Oral"], [4,"Other"]]; //Should we use db or just store it here as a variable? db seems to be a hassle
    sexualactivity_value_list = [1, 2, 3, 4];
    contraceptive_list = [[1,"PrEP"], [2,"Condom"]];
    contraceptive_value_list = [1, 2];

  activities_performed = [];
  contraceptives_used = [];
  comment: string;

    sexualpartners = [];
    sexualpartnerID = [];

  OnCheckboxSelect(item, array, status:boolean) {
    if (array.indexOf(item) === -1 && status) {
      array.push(item);
    }
    else if(!status) {
      let index = array.indexOf(item);
      array.splice(index, 1);
    }

    console.log(array);
  }

  OnSubmit() {
    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2)/* + ' ' + 
    ('00' + date.getUTCHours()).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + date.getUTCSeconds()).slice(-2)*/;

    this.sexualActivityForm = this.formBuilder.group({
      contactid: [this.sexualpartnerID], 
      actid: [this.activities_performed],
      protid: [this.contraceptives_used],
      date: date,
      comment: this.comment
      // some other stuff
    });

    console.log("Activity Form: " + JSON.stringify(this.sexualActivityForm.value));
    this._addSexualService.addactivity(this.sexualActivityForm.value).subscribe(
      data => console.log('Success!', data),
      error => console.error('Error!', error)
    );
    //this.router.navigate(['/sexualhistory']);
    
  }

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private router: Router,
    private formBuilder: FormBuilder, private _addSexualService: AddSexualService) {
    this.sexualActivityForm = this.formBuilder.group({
    });
  }

  getFromSession() {
    // Get from Session Storage
    //this.sexualpartners = Object.values(this.storage);
      var values = Object.values(this.storage);
    //this.sexualpartners = Object.values(values[0]);
    var keys = Object.keys(values[0]);
    console.log("keys:"+ keys);

      this.sexualpartners = keys.map(key => this.storage.get(key));
      this.sexualpartnerID = keys;
      console.log("partners below: ");
      console.log(this.sexualpartners);
  }

  ngOnInit() {
    this.getFromSession();
  }

}
