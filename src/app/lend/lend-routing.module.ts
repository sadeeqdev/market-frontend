import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LendPage } from './lend.page';

const routes: Routes = [
  {
    path: '',
    component: LendPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/lend-landing/lend-landing.module').then( m => m.LendLandingPageModule)
      },
      {
        path: 'loan/:loanId',
        loadChildren: () => import('./pages/lend-loan/lend-loan.module').then( m => m.LendLoanPageModule)
      },
      {
        path: 'request/:requestId',
        loadChildren: () => import('./pages/lend-request/lend-request.module').then( m => m.LendRequestPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LendPageRoutingModule {}
