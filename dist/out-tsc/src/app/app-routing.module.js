import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
var routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
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
    { path: 'add-events', component: AddEventsComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map