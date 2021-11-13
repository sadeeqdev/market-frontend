import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DappReviewComponent } from './app-review/app-review.component';
import { IonicModule } from '@ionic/angular';
import { TruncateMiddlePipe } from '../pipes/truncate-middle.pipe';
import { NftCardComponent } from '../nfts/components/nft-card/nft-card.component';
import { CollectionCardComponent } from '../nfts/components/collection-card/collection-card.component';

@NgModule({
  declarations: [DappReviewComponent, TruncateMiddlePipe, NftCardComponent, CollectionCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [DappReviewComponent, TruncateMiddlePipe, NftCardComponent, CollectionCardComponent]
})
export class SharedComponentsModule { }
