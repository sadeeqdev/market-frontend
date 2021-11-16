import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DappLandingPageRoutingModule } from './dapp-landing-routing.module';

import { DappLandingPage } from './dapp-landing.page';
import { IonicRatingModule } from 'src/app/external/ionic-rating/ionic-rating.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicRatingModule,
    DappLandingPageRoutingModule
  ],
  declarations: [DappLandingPage]
})
export class DappLandingPageModule {}
