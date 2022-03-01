import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrottoLandingPage } from './grotto-landing.page';

const routes: Routes = [
  {
    path: '',
    component: GrottoLandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrottoLandingPageRoutingModule {}
