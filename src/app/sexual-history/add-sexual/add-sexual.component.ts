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

  OnSubmit() {
    // Submit every person where person.selected == true
    // Delete those from the database
  }


  constructor() { }

  ngOnInit() {
  }

}
