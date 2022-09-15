import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from '../guards/auth.guard';
import { ChartComponent } from './chart/chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsersComponent } from './managements/users/users.component';
import { HospitalsComponent } from './managements/hospitals/hospitals.component';
import { DoctorsComponent } from './managements/doctors/doctors.component';
import { DoctorComponent } from './managements/doctors/doctor.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'AccountSettings' } },
      { path: 'charts', component: ChartComponent, data: { title: 'Charts' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'My profile' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress Bar' } },
      { path: 'promise', component: PromiseComponent, data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
      { path: 'search/:query', component: SearchComponent, data: { title: 'Search' } },

      //Managements
      { path: 'users', component: UsersComponent, data: { title: 'Users Managements' } },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals Managements' } },
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors Managements' } },
      { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Doctors Managements' } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
