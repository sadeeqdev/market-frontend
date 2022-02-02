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
import { FormsModule } from '@angular/forms';
import { BlockiePipe } from '../pipes/blockie.pipe';
import { DropCardComponent } from '../drops/components/drop-card/drop-card.component';
import { DropEntryCheddaXpComponent } from '../drops/components/drop-entry-chedda-xp/drop-entry-chedda-xp.component';
import { DropEntryTwitterComponent } from '../drops/components/drop-entry-twitter/drop-entry-twitter.component';
import { LoanRequestStatePipe, LoanStatePipe } from '../pipes/loan-state.pipe';

@NgModule({
  declarations: [
    DappReviewComponent, 
    TruncateMiddlePipe, 
    EthFormattingPipe,
    BlockiePipe,
    RankRewardPipe,
    LoanStatePipe,
    LoanRequestStatePipe,
    DropEntryCheddaXpComponent,
    DropEntryTwitterComponent,
    NftCardComponent, 
    DropCardComponent,
    DappCardComponent,
    FeaturedDappComponent,
    IonicRatingComponent,
    DappRatingModalComponent,
    MyNftCardComponent,
    NftLikeModalComponent,
    FeaturedCollectionCardComponent,
    CollectionCardComponent, 
    ProfilePopoverComponent,
    NetworksPopoverComponent,
    WelcomeModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    DappReviewComponent, 
    TruncateMiddlePipe, 
    EthFormattingPipe,
    BlockiePipe,
    RankRewardPipe,
    LoanStatePipe,
    LoanRequestStatePipe,
    NftCardComponent,
    DropCardComponent,
    DropEntryCheddaXpComponent,
    DropEntryTwitterComponent,
    DappCardComponent,
    DappRatingModalComponent,
    NftLikeModalComponent,
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
