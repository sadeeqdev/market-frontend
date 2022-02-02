import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorrowLandingPage } from './borrow-landing.page';

const routes: Routes = [
  {
    path: '',
    component: BorrowLandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrowLandingPageRoutingModule {}
