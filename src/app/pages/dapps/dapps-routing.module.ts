import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DappsPage } from './dapps.page';

const routes: Routes = [
  {
    path: '',
    component: DappsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DappsPageRoutingModule {}
