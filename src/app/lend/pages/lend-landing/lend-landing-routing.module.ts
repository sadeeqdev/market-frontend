import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LendLandingPage } from './lend-landing.page';

const routes: Routes = [
  {
    path: '',
    component: LendLandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LendLandingPageRoutingModule {}
