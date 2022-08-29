import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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


@NgModule({
  declarations: [
    AccountSettingsComponent,
    ChartComponent,
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    PromiseComponent,
    RxjsComponent,
    ProfileComponent
  ],
  exports:[
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
    FormsModule,
    ComponentsModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
