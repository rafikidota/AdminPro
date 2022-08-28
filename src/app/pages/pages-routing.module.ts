import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ChartComponent } from './chart/chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'ProgressBar' }
      },
      {
        path: 'charts',
        component: ChartComponent,
        data: { title: 'Gráficas' }
      }
      ,
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Ajustes de cuenta' }
      },
      {
        path: 'promise',
        component:
          PromiseComponent,
        data: { title: 'Promesas' }
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: { title: 'RxJs' }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
