import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrottoLandingPageRoutingModule } from './grotto-landing-routing.module';

import { GrottoLandingPage } from './grotto-landing.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrottoLandingPageRoutingModule,
    SharedComponentsModule

  ],
  declarations: [GrottoLandingPage]
})
export class GrottoLandingPageModule {}
