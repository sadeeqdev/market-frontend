import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorrowPoolDetailsPage } from './borrow-pool-details.page';

const routes: Routes = [
  {
    path: '',
    component: BorrowPoolDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrowPoolDetailsPageRoutingModule {}
