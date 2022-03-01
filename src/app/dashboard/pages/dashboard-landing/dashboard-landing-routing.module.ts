import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardLandingPage } from './dashboard-landing.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardLandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardLandingPageRoutingModule {}
