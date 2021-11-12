import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NftLandingPage } from './nft-landing.page';

const routes: Routes = [
  {
    path: '',
    component: NftLandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NftLandingPageRoutingModule {}
