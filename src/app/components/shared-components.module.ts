import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TruncateMiddlePipe } from '../pipes/truncate-middle.pipe';
import { ProfilePopoverComponent } from '../profile/components/profile-popover/profile-popover.component';
import { RouterModule } from '@angular/router';
import { WelcomeModalComponent } from './welcome-modal/welcome-modal.component';
import { IonicRatingComponent } from '../external/ionic-rating/ionic-rating.component';
import { NetworksPopoverComponent } from '../main-navigation/networks-popover/networks-popover.component';
import { EthFormattingPipe } from '../pipes/eth-formatting.pipe';
import { FormsModule } from '@angular/forms';
import { BlockiePipe } from '../pipes/blockie.pipe';
import { LoanRequestStatePipe, LoanStatePipe } from '../pipes/loan-state.pipe';
import { RoundingPipe } from '../pipes/rounding-pipe';
import { AssetTabComponent } from '../shared/components/asset-tab/asset-tab.component';
import { LoadingModalComponent } from '../shared/components/loading-modal/loading-modal.component';
import { ActionModalComponent } from '../shared/components/action-modal/action-modal.component';

@NgModule({
  declarations: [
    TruncateMiddlePipe, 
    EthFormattingPipe,
    BlockiePipe,
    LoanStatePipe,
    LoanRequestStatePipe,
    RoundingPipe,
    IonicRatingComponent,
    ProfilePopoverComponent,
    NetworksPopoverComponent,
    WelcomeModalComponent,
    AssetTabComponent,
    LoadingModalComponent,
    ActionModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    TruncateMiddlePipe, 
    EthFormattingPipe,
    BlockiePipe,
    LoanStatePipe,
    RoundingPipe,
    LoanRequestStatePipe,
    IonicRatingComponent,
    ProfilePopoverComponent,
    NetworksPopoverComponent,
    WelcomeModalComponent,
    AssetTabComponent,
    LoadingModalComponent,
    ActionModalComponent,
  ]
})
export class SharedComponentsModule { }
