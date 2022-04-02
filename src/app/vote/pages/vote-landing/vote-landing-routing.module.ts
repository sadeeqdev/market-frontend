import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoteLandingPage } from './vote-landing.page';

const routes: Routes = [
  {
    path: '',
    component: VoteLandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoteLandingPageRoutingModule {}
