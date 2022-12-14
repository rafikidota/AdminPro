import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ChartComponent } from './chart/chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './managements/users/users.component';
import { HospitalsComponent } from './managements/hospitals/hospitals.component';
import { DoctorsComponent } from './managements/doctors/doctors.component';
import { DoctorComponent } from './managements/doctors/doctor.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    AccountSettingsComponent,
    ChartComponent,
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    PromiseComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorComponent,
    SearchComponent
  ],
  exports: [
    AccountSettingsComponent,
    ChartComponent,
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    PromiseComponent,
    RxjsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    PagesRoutingModule,
    SharedModule,
    PipesModule
  ]
})
export class PagesModule { }
