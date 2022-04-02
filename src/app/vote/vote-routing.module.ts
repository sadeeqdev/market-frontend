import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VotePage } from './vote.page';

const routes: Routes = [
  {
    path: '',
    component: VotePage,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/vote-landing/vote-landing.module').then( m => m.VoteLandingPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VotePageRoutingModule {}
