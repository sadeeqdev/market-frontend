import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LendRequestPage } from './lend-request.page';

const routes: Routes = [
  {
    path: '',
    component: LendRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LendRequestPageRoutingModule {}
