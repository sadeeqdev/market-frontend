import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorrowPage } from './borrow.page';

const routes: Routes = [
  {
    path: '',
    component: BorrowPage
  },
  {
    path: 'mynfts',
    loadChildren: () => import('./pages/mynfts/mynfts.module').then( m => m.MynftsPageModule)
  },
  {
    path: 'mycollateral',
    loadChildren: () => import('./pages/mycollateral/mycollateral.module').then( m => m.MycollateralPageModule)
  },
  {
    path: 'loan',
    loadChildren: () => import('./pages/loan/loan.module').then( m => m.LoanPageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./pages/request/request.module').then( m => m.RequestPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrowPageRoutingModule {}
