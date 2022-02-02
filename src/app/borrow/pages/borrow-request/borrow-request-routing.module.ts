import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorrowRequestPage } from './borrow-request.page';

const routes: Routes = [
  {
    path: '',
    component: BorrowRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrowRequestPageRoutingModule {}
