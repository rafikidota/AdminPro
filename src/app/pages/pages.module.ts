import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ChartComponent } from './chart/chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [
    AccountSettingsComponent,
    ChartComponent,
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    PromiseComponent,
    RxjsComponent
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
    PagesRoutingModule
  ]
})
export class PagesModule { }
