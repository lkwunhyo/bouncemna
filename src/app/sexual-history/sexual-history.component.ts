import { Component, OnInit } from '@angular/core';
import { SexualHistoryService } from '../services/sexual-history.service';

@Component({
  selector: 'app-sexual-history',
  templateUrl: './sexual-history.component.html',
  styleUrls: ['./sexual-history.component.css']
})
export class SexualHistoryComponent implements OnInit {

  public activitylist = [];
  
  constructor(private _sexualHistoryService: SexualHistoryService) { }

  public convertDate(date) {
    var sqlDate = new Date(date);
    return (sqlDate.getMonth() + 1) + '/' + sqlDate.getDate() + '/' + sqlDate.getFullYear();
  }

  ngOnInit() {
    this._sexualHistoryService.getActivity()
          .subscribe((res: any[]) => {
              console.log(res);
              this.activitylist = res;
          });
  }

}
