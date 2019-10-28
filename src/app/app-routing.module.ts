import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AddSexualComponent } from './sexual-history/add-sexual/add-sexual.component';
import { AddPartnerComponent } from './sexual-history/add-sexual/add-partner/add-partner.component';
import { AlertPartnersComponent } from './alert-partners/alert-partners.component';
import { SexualHistoryComponent } from './sexual-history/sexual-history.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AboutComponent } from './about/about.component';
import { ClinicLocationComponent } from './about/clinic-location/clinic-location.component';
import { MapComponent } from './about/clinic-location/map/map.component';
import { DiagnosisHistoryComponent } from './diagnosis-history/diagnosis-history.component';
import { CalenderComponent } from './calender/calender.component';
import { DeleteContactComponent } from './contact/delete-contact/delete-contact.component';
import { DeletePartnerComponent } from './sexual-history/add-sexual/delete-partner/delete-partner.component';
import { AddEventsComponent } from './calender/add-events/add-events.component';
import { ContactProfileComponent } from './contact/contact-profile/contact-profile.component';
import { RewardsComponent } from './rewards/rewards.component';
import { QrscannerComponent } from './contact-form/qrscanner/qrscanner.component'




const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'nav', component: NavComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'contactform', component: ContactFormComponent },
    { path: 'addactivity', component: AddSexualComponent },
    { path: 'addpartner', component: AddPartnerComponent },
    { path: 'alertpartners', component: AlertPartnersComponent },
    { path: 'sexualhistory', component: SexualHistoryComponent },
    { path: 'editprofile', component: EditprofileComponent },
    { path: 'about', component: AboutComponent },
    { path: 'map', component: MapComponent },
    { path: 'cliniclocation', component: ClinicLocationComponent },
    { path: 'diagnosishistory', component: DiagnosisHistoryComponent },
    { path: 'calender', component: CalenderComponent },
    { path: 'deletecontact', component: DeleteContactComponent },
    { path: 'deletepartner', component: DeletePartnerComponent },
    { path: 'add-events', component: AddEventsComponent },
    { path: 'contactprofile', component: ContactProfileComponent },
    { path: 'contactprofile/:id', component: ContactProfileComponent },
    { path: 'rewards', component: RewardsComponent },
    { path: 'qrscanner', component: QrscannerComponent }
    //{ path: 'diagnosishistory?alertid:alertid', component: DiagnosisHistoryComponent }
    //{ path: 'diagnosishistory/:alertid', component: DiagnosisHistoryComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule { }
