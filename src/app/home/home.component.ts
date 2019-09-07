import { Component, OnInit } from '@angular/core';
import { HEALTHINFO } from '../models/health-info_mock'
import { HealthInfo } from '../models/health-info.model'
import { AppHttpService } from '../services/apphttp.service'




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  counter = 0;
    v = HEALTHINFO[0].info
    constructor(private http: AppHttpService) { }

  ngOnInit() {
    setInterval(() => {
      this.v = HEALTHINFO[this.counter].info
      this.counter++;
      if (this.counter >= HEALTHINFO.length){
        this.counter = 0;
      }
  }, 5000); //slightly less than 5 seconds
    
    }


}
