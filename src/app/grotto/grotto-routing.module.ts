import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrottoPage } from './grotto.page';

const routes: Routes = [
  {
    path: '',
    component: GrottoPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/grotto-landing/grotto-landing.module').then( m => m.GrottoLandingPageModule)      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrottoPageRoutingModule {}
