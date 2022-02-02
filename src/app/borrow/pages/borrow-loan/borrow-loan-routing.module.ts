import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorrowLoanPage } from './borrow-loan.page';

const routes: Routes = [
  {
    path: '',
    component: BorrowLoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrowLoanPageRoutingModule {}
