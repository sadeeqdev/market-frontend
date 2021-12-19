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
import { DappCardComponent } from '../dapps/components/dapp-card/dapp-card.component';
import { FeaturedDappComponent } from '../dapps/components/featured-dapp/featured-dapp.component';
import { NetworksPopoverComponent } from '../main-navigation/networks-popover/networks-popover.component';
import { EthFormattingPipe } from '../pipes/eth-formatting.pipe';
import { NftLikeModalComponent } from './nft-like-modal/nft-like-modal.component';
import { MyNftCardComponent } from '../nfts/components/my-nft-card/my-nft-card.component';
import { ListNftModalComponent } from '../nfts/components/list-nft-modal/list-nft-modal.component';

@NgModule({
  declarations: [
    DappReviewComponent, 
    TruncateMiddlePipe, 
    EthFormattingPipe,
    RankRewardPipe,
    NftCardComponent, 
    DappCardComponent,
    FeaturedDappComponent,
    IonicRatingComponent,
    DappRatingModalComponent,
    MyNftCardComponent,
    NftLikeModalComponent,
    ListNftModalComponent,
    FeaturedCollectionCardComponent,
    CollectionCardComponent, 
    ProfilePopoverComponent,
    NetworksPopoverComponent,
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
    EthFormattingPipe,
    RankRewardPipe,
    NftCardComponent,
    DappCardComponent,
    DappRatingModalComponent,
    NftLikeModalComponent,
    ListNftModalComponent,
    MyNftCardComponent,
    FeaturedDappComponent,
    IonicRatingComponent,
    FeaturedCollectionCardComponent,
    CollectionCardComponent, 
    ProfilePopoverComponent,
    NetworksPopoverComponent,
    WelcomeModalComponent
  ]
})
export class SharedComponentsModule { }
