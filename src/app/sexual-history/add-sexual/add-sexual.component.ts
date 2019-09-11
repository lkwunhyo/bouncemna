import { Component, OnInit } from '@angular/core';
import { WebStorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { Inject } from '@angular/core';  

@Component({
  selector: 'app-add-sexual',
  templateUrl: './add-sexual.component.html',
  styleUrls: ['./add-sexual.component.css']
})
export class AddSexualComponent implements OnInit {

  sexualactivity_list = ["Vaginal", "Anal", "Oral", "Other"];
  contraceptive_list = ["Pill", "Condom"];

  activities_performed = [];
  contraceptives_used = [];

  sexualpartners = [];

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
    // Submit every person where person.selected == true
    // Delete those from the database
  }


  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) {

  }

  getFromSession() {
    // Get from Session Storage
    //this.sexualpartners = Object.values(this.storage);
    var values = Object.values(this.storage);
    //this.sexualpartners = Object.values(values[0]);
    var keys = Object.keys(values[0]);
    console.log(keys);

    this.sexualpartners = keys.map(key => this.storage.get(key));
    console.log(this.sexualpartners);
  }

  ngOnInit() {
    this.getFromSession();
  }

}
