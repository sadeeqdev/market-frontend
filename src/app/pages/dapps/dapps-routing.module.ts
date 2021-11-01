import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DappsPage } from './dapps.page';

const routes: Routes = [
  {
    path: '',
    component: DappsPage
  },
  {
    path: 'details/:address',
    loadChildren: () => import('./dapp-details/dapp-details.module').then( m => m.DappDetailsPageModule)
  },
  {
    path: 'dapp-category',
    loadChildren: () => import('./dapp-category/dapp-category.module').then( m => m.DappCategoryPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DappsPageRoutingModule {}
