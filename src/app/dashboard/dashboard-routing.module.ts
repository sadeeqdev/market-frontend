import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/dashboard-landing/dashboard-landing.module').then( m => m.DashboardLandingPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
