import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NftsPageRoutingModule } from './nfts-routing.module';

import { NftsPage } from './nfts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NftsPageRoutingModule
  ],
  declarations: [NftsPage]
})
export class NftsPageModule {}
