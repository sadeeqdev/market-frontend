import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MycollateralPage } from './mycollateral.page';

const routes: Routes = [
  {
    path: '',
    component: MycollateralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MycollateralPageRoutingModule {}
