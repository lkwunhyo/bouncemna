import { Component, OnInit } from '@angular/core';
import { HEALTHINFO } from '../models/health-info_mock'
import { HealthInfo } from '../models/health-info.model'
import { AppHttpService } from '../services/apphttp.service'
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  counter = 0;
  v = HEALTHINFO[0].info

  userId: string;

  constructor(private http: AppHttpService) { }
 /*
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
*/

  ngOnInit() {
    setInterval(() => {
      this.v = HEALTHINFO[this.counter].info
      this.counter++;
      if (this.counter >= HEALTHINFO.length){
        this.counter = 0;
      }
    }, 5000); //slightly less than 5 seconds
    //this.userId = sess.userid;
    /*
          .subscribe((res: any[]) => {
              console.log(res);
              this.contactlist = this._contactService.filterBy(res);
          });*/
    //userId = sess.userid;    
  }


}
