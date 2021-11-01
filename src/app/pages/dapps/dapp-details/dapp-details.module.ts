import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DappDetailsPageRoutingModule } from './dapp-details-routing.module';

import { DappDetailsPage } from './dapp-details.page';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { IonicRatingModule } from 'src/app/external/ionic-rating/ionic-rating.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    HttpClientModule,
    SharedComponentsModule,
    IonicRatingModule,
    DappDetailsPageRoutingModule
  ],
  declarations: [DappDetailsPage]
})
export class DappDetailsPageModule {}
