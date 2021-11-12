import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DappDetailsPageRoutingModule } from './dapp-details-routing.module';

import { DappDetailsPage } from './dapp-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DappDetailsPageRoutingModule
  ],
  declarations: [DappDetailsPage]
})
export class DappDetailsPageModule {}
