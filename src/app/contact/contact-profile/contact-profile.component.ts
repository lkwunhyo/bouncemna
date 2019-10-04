import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { ContactService } from '../../services/contact.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, find } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.css']
})
export class ContactProfileComponent implements OnInit {

  contactList = [];
  contact: any;
  contactparam: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ContactService,
    private activatedRoute: ActivatedRoute,
    private _contactService: ContactService
    ) { }

    getContact(id: string): Observable<Person>{
      return this._contactService.getContactList().pipe(
          map(contactList => contactList.find(contact => contact.id === parseInt(id)))
      );
  }

  ngOnInit() {
    this.contactparam = this.route.snapshot.paramMap.get('id');
    console.log("Contact Param: " + this.contactparam);
    this._contactService.getContactList()
        .subscribe((res: any[]) => {
            console.log(res);
            this.contactList = this._contactService.filterBy(res);

            for(let contact of this.contactList) {
              if(contact.contactID === parseInt(this.contactparam)) {
                this.contact = contact;
                console.log(this.contact);
              }
            }
    });
  }

}
