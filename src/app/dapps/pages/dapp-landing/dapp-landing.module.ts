import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DappLandingPageRoutingModule } from './dapp-landing-routing.module';

import { DappLandingPage } from './dapp-landing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DappLandingPageRoutingModule
  ],
  declarations: [DappLandingPage]
})
export class DappLandingPageModule {}
