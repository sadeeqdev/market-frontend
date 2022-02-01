import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LendPage } from './lend.page';

const routes: Routes = [
  {
    path: '',
    component: LendPage
  },
  {
    path: 'request',
    loadChildren: () => import('./pages/request/request.module').then( m => m.RequestPageModule)
  },
  {
    path: 'loan',
    loadChildren: () => import('./pages/loan/loan.module').then( m => m.LoanPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LendPageRoutingModule {}
