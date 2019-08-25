import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ContactService } from './services/contact.service';
import { SearchPipe } from './pipes/search.pipe';
import { AddSexualComponent } from './sexual-history/add-sexual/add-sexual.component';
import { AddPartnerComponent } from './sexual-history/add-sexual/add-partner/add-partner.component';
import { AlertPartnersComponent } from './alert-partners/alert-partners.component';
import {SuiModule} from 'ng2-semantic-ui';
import { SexualHistoryComponent } from './sexual-history/sexual-history.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AboutComponent } from './about/about.component';
import { ClinicLocationComponent } from './about/clinic-location/clinic-location.component';
import { MapComponent } from './about/clinic-location/map/map.component';
import { DiagnosisHistoryComponent } from './diagnosis-history/diagnosis-history.component';
import { HereMapComponent } from './about/clinic-location/map/here-map/here-map.component';
import { CalenderComponent } from './calender/calender.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { MatFormFieldModule,MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule,MatSelectModule, MatRadioModule,MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteContactComponent } from './contact/delete-contact/delete-contact.component';
import { DeletePartnerComponent } from './sexual-history/add-sexual/delete-partner/delete-partner.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { APP_BASE_HREF } from '@angular/common';
import { AddEventsComponent } from './calender/add-events/add-events.component';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_DATE_LOCALE } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    RegisterComponent,
    ProfileComponent,
    ContactComponent,
    ContactFormComponent,
    SearchPipe,
    AddSexualComponent,
    AddPartnerComponent,
    AlertPartnersComponent,
    SexualHistoryComponent,
    EditprofileComponent,
    AboutComponent,
    ClinicLocationComponent,
    MapComponent,
    DiagnosisHistoryComponent,
    HereMapComponent,
    CalenderComponent,
    DeleteContactComponent,
    DeletePartnerComponent,
    AddEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, SuiModule,
    FullCalendarModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule, 
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule, 
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatDividerModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
        useFactory: adapterFactory,
    })
  ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },{ provide: APP_BASE_HREF, useValue: '/'}, ContactService,MatDatepickerModule],
  bootstrap: [AppComponent],
  
})
export class AppModule { }



