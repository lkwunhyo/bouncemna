import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/services/apphttp.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bounce';
  _url = '/logout';
  _barurl = '/sidebar';
  log;

  auth = null;
  userId = null;
  loggedIn = false;

  constructor(private _apphttpService: AppHttpService,
    private router: Router) { }

  toggle() {
    $('.ui.sidebar').sidebar('toggle');
  }

  logoutClick() {
    console.log("logging out click...");
    this._apphttpService.get(this._url, '2ND BODY PARAM').subscribe(
      logout => { console.log('Success!', logout); },
      error => { console.error('Error!', error) }
    );
  }

  ngOnInit() {
    this._apphttpService.getAuth().subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.auth = res;
        this.userId = res.userid;
        this.loggedIn = res.loggedIn;
      }

    });

  }
}
