import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DappsPage } from './dapps.page';

const routes: Routes = [
  {
    path: '',
    component: DappsPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/dapp-landing/dapp-landing.module').then(m => m.DappLandingPageModule)
      },
      {
        path: 'details/:address',
        loadChildren: () => import('./pages/dapp-details/dapp-details.module').then(m => m.DappDetailsPageModule)
      },
      {
        path: 'category/:category',
        loadChildren: () => import('./pages/dapp-category/dapp-category.module').then(m => m.DappCategoryPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DappsPageRoutingModule {}
