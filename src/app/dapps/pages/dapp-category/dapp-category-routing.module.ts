import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DappCategoryPage } from './dapp-category.page';

const routes: Routes = [
  {
    path: '',
    component: DappCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DappCategoryPageRoutingModule {}
