import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DropDetailsPage } from './drop-details.page';

const routes: Routes = [
  {
    path: '',
    component: DropDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DropDetailsPageRoutingModule {}
