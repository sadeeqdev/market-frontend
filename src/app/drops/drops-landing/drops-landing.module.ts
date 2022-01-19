import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DropsLandingPageRoutingModule } from './drops-landing-routing.module';

import { DropsLandingPage } from './drops-landing.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    DropsLandingPageRoutingModule
  ],
  declarations: [DropsLandingPage]
})
export class DropsLandingPageModule {}
