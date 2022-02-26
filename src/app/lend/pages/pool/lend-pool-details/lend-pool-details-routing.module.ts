import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LendPoolDetailsPage } from './lend-pool-details.page';

const routes: Routes = [
  {
    path: '',
    component: LendPoolDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LendPoolDetailsPageRoutingModule {}
