import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NftLandingPageRoutingModule } from './nft-landing-routing.module';

import { NftLandingPage } from './nft-landing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NftLandingPageRoutingModule
  ],
  declarations: [NftLandingPage]
})
export class NftLandingPageModule {}
