import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DappLandingPage } from './dapp-landing.page';

const routes: Routes = [
  {
    path: '',
    component: DappLandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DappLandingPageRoutingModule {}
