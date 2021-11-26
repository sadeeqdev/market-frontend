import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DappLandingPageRoutingModule } from './dapp-landing-routing.module';

import { DappLandingPage } from './dapp-landing.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    DappLandingPageRoutingModule
  ],
  declarations: [DappLandingPage]
})
export class DappLandingPageModule {}
