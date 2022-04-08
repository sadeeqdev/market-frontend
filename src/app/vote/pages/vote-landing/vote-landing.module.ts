import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoteLandingPageRoutingModule } from './vote-landing-routing.module';

import { VoteLandingPage } from './vote-landing.page';
import { NgChartsModule } from 'ng2-charts';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgChartsModule,
    SharedComponentsModule,
    VoteLandingPageRoutingModule
  ],
  declarations: [VoteLandingPage]
})
export class VoteLandingPageModule {}
