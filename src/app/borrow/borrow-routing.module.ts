import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorrowPage } from './borrow.page';

const routes: Routes = [
  {
    path: '',
    component: BorrowPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/borrow-landing/borrow-landing.module').then( m => m.BorrowLandingPageModule)
      },
      {
        path: 'pool/:id',
        loadChildren: () => import('./pages/pool/borrow-pool-details/borrow-pool-details.module').then( m => m.BorrowPoolDetailsPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrowPageRoutingModule {}
