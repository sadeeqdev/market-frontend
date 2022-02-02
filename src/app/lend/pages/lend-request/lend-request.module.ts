import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LendRequestPageRoutingModule } from './lend-request-routing.module';

import { LendRequestPage } from './lend-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LendRequestPageRoutingModule
  ],
  declarations: [LendRequestPage]
})
export class LendRequestPageModule {}
