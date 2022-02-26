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
        path: 'mynfts',
        loadChildren: () => import('./pages/mynfts/mynfts.module').then( m => m.MynftsPageModule)
      },
      {
        path: 'mycollateral',
        loadChildren: () => import('./pages/mycollateral/mycollateral.module').then( m => m.MycollateralPageModule)
      },
      {
        path: 'request/:id',
        loadChildren: () => import('./pages/borrow-request/borrow-request.module').then( m => m.BorrowRequestPageModule)
      },
      {
        path: 'request/:nftContract/:tokenID',
        loadChildren: () => import('./pages/borrow-request/borrow-request.module').then( m => m.BorrowRequestPageModule)
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
