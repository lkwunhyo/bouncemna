import { Component } from '@angular/core';
import { AppHttpService } from 'src/app/services/apphttp.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bounce';
  _url = '/logout';
  log;

  constructor(private _apphttpService: AppHttpService,
    private router: Router) { }

  toggle() {
    $('.ui.sidebar').sidebar('toggle');
  }

  logoutClick() {
    console.log("logging out click...");
    this._apphttpService.get(this._url, '2ND BODY PARAM').subscribe(
      logout => {console.log('Success!', logout);},
      error => {console.error('Error!', error)}
    );
  }
}
