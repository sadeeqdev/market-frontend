import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DappCategoryPageRoutingModule } from './dapp-category-routing.module';

import { DappCategoryPage } from './dapp-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DappCategoryPageRoutingModule
  ],
  declarations: [DappCategoryPage]
})
export class DappCategoryPageModule {}
