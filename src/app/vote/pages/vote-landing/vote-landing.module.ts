import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoteLandingPageRoutingModule } from './vote-landing-routing.module';

import { VoteLandingPage } from './vote-landing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoteLandingPageRoutingModule
  ],
  declarations: [VoteLandingPage]
})
export class VoteLandingPageModule {}
