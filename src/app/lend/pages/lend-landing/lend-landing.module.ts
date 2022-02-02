import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LendLandingPageRoutingModule } from './lend-landing-routing.module';

import { LendLandingPage } from './lend-landing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LendLandingPageRoutingModule
  ],
  declarations: [LendLandingPage]
})
export class LendLandingPageModule {}
