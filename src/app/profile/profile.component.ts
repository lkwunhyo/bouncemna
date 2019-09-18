import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	public QrCodeData: string = null;
	
  constructor() { 
	this.QrCodeData = 'This is data that represents profile information, it would be about this long, maybe even more';
  }

  ngOnInit() {
  }

}
