import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NftCollectionPage } from './nft-collection.page';

const routes: Routes = [
  {
    path: '',
    component: NftCollectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NftCollectionPageRoutingModule {}
