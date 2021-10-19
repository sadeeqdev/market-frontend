import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'dapps',
        loadChildren: () => import('../pages/dapps/dapps.module').then( m => m.DappsPageModule)
      },
      {
        path: 'nfts',
        loadChildren: () => import('../pages/nfts/nfts.module').then( m => m.NftsPageModule)
      },
      {
        path: 'governance',
        loadChildren: () => import('../pages/governance/governance.module').then( m => m.GovernancePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
