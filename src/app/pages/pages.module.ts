import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

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
import { TableComponent } from './managements/table/table.component';


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
    TableComponent
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
    ComponentsModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
