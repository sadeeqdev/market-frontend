import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DappsPageRoutingModule } from './dapps-routing.module';

import { DappsPage } from './dapps.page';
import { IonicRatingModule } from '../external/ionic-rating/ionic-rating.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicRatingModule,
    DappsPageRoutingModule
  ],
  declarations: [DappsPage]
})
export class DappsPageModule {}
