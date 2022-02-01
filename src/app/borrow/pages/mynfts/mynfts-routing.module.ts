import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MynftsPage } from './mynfts.page';

const routes: Routes = [
  {
    path: '',
    component: MynftsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MynftsPageRoutingModule {}
