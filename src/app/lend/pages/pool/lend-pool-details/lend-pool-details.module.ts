import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LendPoolDetailsPageRoutingModule } from './lend-pool-details-routing.module';

import { LendPoolDetailsPage } from './lend-pool-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LendPoolDetailsPageRoutingModule
  ],
  declarations: [LendPoolDetailsPage]
})
export class LendPoolDetailsPageModule {}
