import { Component, OnInit } from '@angular/core';

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
  /*
  OnActivityCheckboxSelect(activity, status:boolean) {
    if (this.activities_performed.indexOf(activity) === -1 && status) {
      this.activities_performed.push(activity);
    }
    else if(!status) {
      let index = this.activities_performed.indexOf(activity);
      this.activities_performed.splice(index, 1);
    }
    console.log(this.activities_performed);
  }
  OnContraceptiveCheckboxSelect(contraceptive, status:boolean) {
    if (this.contraceptives_used.indexOf(contraceptive) === -1 && status) {
      this.contraceptives_used.push(contraceptive);
    }
    else if(!status) {
      let index = this.contraceptives_used.indexOf(contraceptive);
      this.contraceptives_used.splice(index, 1);
    }
    console.log(this.contraceptives_used);
  }
  */

  OnSubmit() {
    // Submit every person where person.selected == true
    // Delete those from the database
  }


  constructor() { }

  ngOnInit() {
  }

}
