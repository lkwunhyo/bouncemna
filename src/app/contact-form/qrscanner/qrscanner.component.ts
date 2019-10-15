import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Person } from '../../models/person';
import { Router, NavigationStart } from '@angular/router';
import { ContactFormService } from '../../services/contact-form.service';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.css']
})
export class QrscannerComponent implements OnInit {

  qrData = null;
  hasCameras = false;
  hasPermission: boolean;
  contact = new Person();
  contactForm: FormGroup;
  
  @ViewChild('scanner')
  scanner: QrscannerComponent;

  constructor(private router: Router, private formBuilder: FormBuilder, private _contactFormService: ContactFormService) { 
    this.contactForm = this.formBuilder.group({
    });

  }

  scanCode(data: any) {
    console.log('Result: ', data);
    this.qrData = JSON.parse(data);
    console.log(this.qrData);

    this.contactForm = this.formBuilder.group({
      //'id': this.contact.id,
      firstname: this.qrData.firstname,
      lastname: this.qrData.lastname,
      phone: this.qrData.phone,
      email: this.qrData.email,
      age: this.qrData.age,
      gender: this.qrData.gender,
      comment: this.qrData.comment,
      rating: this.qrData.rating
      // some other stuff
    });

    console.log("Contact Form: " + JSON.stringify(this.contactForm.value));
    this._contactFormService.addcontact(this.qrData).subscribe(
      data => console.log('Success!', data),
      error => console.error('Error!', error)
      );
      //this.router.navigated = false;
      //this.router.navigate(['/contact']).then(() => {
      //    window.location.reload();
      //});
      var url = window.location.origin + "/contact";
      location.replace(url);

  }

  ngOnInit() {
    
  }

}
