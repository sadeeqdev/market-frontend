import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
    {
      path: 'dapps',
      loadChildren: () => import('./pages/dapps/dapps.module').then( m => m.DappsPageModule)
    },
    {
      path: 'nfts',
      loadChildren: () => import('./nfts/nfts.module').then( m => m.NftsPageModule)
    },
    {
      path: 'governance',
      loadChildren: () => import('./pages/governance/governance.module').then( m => m.GovernancePageModule)
    },
  {
    path: '',
    redirectTo: 'dapps',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
