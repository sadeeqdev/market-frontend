import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DappReviewComponent } from './app-review/app-review.component';
import { IonicModule } from '@ionic/angular';
import { TruncateMiddlePipe } from '../pipes/truncate-middle.pipe';
import { NftCardComponent } from '../nfts/components/nft-card/nft-card.component';
import { CollectionCardComponent } from '../nfts/components/collection-card/collection-card.component';
import { ProfilePopoverComponent } from '../profile/components/profile-popover/profile-popover.component';
import { RouterModule } from '@angular/router';
import { WelcomeModalComponent } from './welcome-modal/welcome-modal.component';
import { DappRatingModalComponent } from './dapp-rating-modal/dapp-rating-modal.component';
import { IonicRatingComponent } from '../external/ionic-rating/ionic-rating.component';
import { RankRewardPipe } from '../rewards/rank-reward.pipe';
import { FeaturedCollectionCardComponent } from '../nfts/components/featured-collection-card/featured-collection-card.component';

@NgModule({
  declarations: [
    DappReviewComponent, 
    TruncateMiddlePipe, 
    RankRewardPipe,
    NftCardComponent, 
    IonicRatingComponent,
    DappRatingModalComponent,
    FeaturedCollectionCardComponent,
    CollectionCardComponent, 
    ProfilePopoverComponent,
    WelcomeModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    DappReviewComponent, 
    TruncateMiddlePipe, 
    RankRewardPipe,
    NftCardComponent, 
    IonicRatingComponent,
    FeaturedCollectionCardComponent,
    CollectionCardComponent, 
    ProfilePopoverComponent,
    WelcomeModalComponent
  ]
})
export class SharedComponentsModule { }
