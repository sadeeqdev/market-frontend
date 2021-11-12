import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NftCollectionPageRoutingModule } from './nft-collection-routing.module';

import { NftCollectionPage } from './nft-collection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NftCollectionPageRoutingModule
  ],
  declarations: [NftCollectionPage]
})
export class NftCollectionPageModule {}
