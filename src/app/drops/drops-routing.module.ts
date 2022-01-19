import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DropsPage } from './drops.page';

const routes: Routes = [
  {
    path: '',
    component: DropsPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./drops-landing/drops-landing.module').then( m => m.DropsLandingPageModule)
      },
      {
        path: 'details/:id',
        loadChildren: () => import('./drop-details/drop-details.module').then( m => m.DropDetailsPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DropsPageRoutingModule {}
