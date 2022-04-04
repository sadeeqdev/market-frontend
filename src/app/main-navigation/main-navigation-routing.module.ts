import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainNavigationPage } from './main-navigation.page';

const routes: Routes = [
  {
    path: '',
    component: MainNavigationPage,
    children: [
      {
        path: '',
        redirectTo: 'lend'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'dapps',
        loadChildren: () => import('../dapps/dapps.module').then( m => m.DappsPageModule)
      },
      {
        path: 'market',
        loadChildren: () => import('../nfts/nfts.module').then( m => m.NftsModule)
      },
      {
        path: 'rewards',
        loadChildren: () => import('../rewards/rewards.module').then( m => m.RewardsPageModule)
      },
      {
        path:'launches',
        loadChildren: () => import('../drops/drops.module').then(m => m.DropsPageModule)
      },
      {
        path: 'governance',
        loadChildren: () => import('../governance/governance.module').then( m => m.GovernancePageModule)
      },
      {
        path: 'profile/:address',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path:'lend',
        loadChildren: () => import('../lend/lend.module').then(m => m.LendPageModule)
      },
      {
        path:'borrow',
        loadChildren: () => import('../borrow/borrow.module').then(m => m.BorrowPageModule)
      },
      {
        path: 'grotto',
        loadChildren: () => import('../grotto/grotto.module').then( m => m.GrottoPageModule)
      },
      {
        path: 'vote',
        loadChildren: () => import('../vote/vote.module').then( m => m.VotePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainNavigationPageRoutingModule {}
