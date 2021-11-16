import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ClipboardModule} from '@angular/cdk/clipboard';

import { IonicModule } from '@ionic/angular';

import { NftCollectionPageRoutingModule } from './nft-collection-routing.module';

import { NftCollectionPage } from './nft-collection.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    ClipboardModule,
    NftCollectionPageRoutingModule
  ],
  declarations: [NftCollectionPage]
})
export class NftCollectionPageModule {}
