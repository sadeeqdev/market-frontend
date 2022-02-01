import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MynftsPageRoutingModule } from './mynfts-routing.module';

import { MynftsPage } from './mynfts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MynftsPageRoutingModule
  ],
  declarations: [MynftsPage]
})
export class MynftsPageModule {}
