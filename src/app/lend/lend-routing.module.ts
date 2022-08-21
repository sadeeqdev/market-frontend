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
        path: 'pool/:id',
        loadChildren: () => import('./pages/pool/lend-pool-details/lend-pool-details.module').then( m => m.LendPoolDetailsPageModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LendPageRoutingModule {}
