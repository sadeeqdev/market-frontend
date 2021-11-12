import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NftDetailsPageRoutingModule } from './nft-details-routing.module';

import { NftDetailsPage } from './nft-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NftDetailsPageRoutingModule
  ],
  declarations: [NftDetailsPage]
})
export class NftDetailsPageModule {}
