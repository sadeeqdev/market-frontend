import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DappDetailsPage } from './dapp-details.page';

const routes: Routes = [
  {
    path: '',
    component: DappDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DappDetailsPageRoutingModule {}
