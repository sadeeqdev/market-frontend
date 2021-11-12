import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NftsPage } from '../nfts/nfts.page';

const routes: Routes = [
  {
    path: '',
    component: NftsPage,
    children: [
      {
        path: 'details',
        loadChildren: () => import('./pages/nft-details/nft-details.module').then( m => m.NftDetailsPageModule)
      },
      {
        path: 'landing',
        loadChildren: () => import('./pages/nft-landing/nft-landing.module').then( m => m.NftLandingPageModule)
      },
      {
        path: 'collection/:id',
        loadChildren: () => import('./pages/nft-collection/nft-collection.module').then( m => m.NftCollectionPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NftsPageRoutingModule {}
