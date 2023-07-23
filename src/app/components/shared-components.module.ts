import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TruncateMiddlePipe } from '../pipes/truncate-middle.pipe';
// import { ProfilePopoverComponent } from '../profile/components/profile-popover/profile-popover.component';
import { RouterModule } from '@angular/router';
import { WelcomeModalComponent } from './welcome-modal/welcome-modal.component';
import { IonicRatingComponent } from '../external/ionic-rating/ionic-rating.component';
import { NetworksPopoverComponent } from '../main-navigation/networks-popover/networks-popover.component';
import { ProfilePopoverComponent } from '../main-navigation/profile-popover/profile-popover.component';
import { EthFormattingPipe } from '../pipes/eth-formatting.pipe';
import { FormsModule } from '@angular/forms';
import { BlockiePipe } from '../pipes/blockie.pipe';
import { LoanRequestStatePipe, LoanStatePipe } from '../pipes/loan-state.pipe';
import { RoundingPipe } from '../pipes/rounding-pipe';
import { AssetTabComponent } from '../shared/components/asset-tab/asset-tab.component';
import { LoadingModalComponent } from '../shared/components/loading-modal/loading-modal.component';
import { ActionModalComponent } from '../shared/components/action-modal/action-modal.component';
import { PageTitleComponent } from '../shared/components/page-title/page-title.component';
import { PacmanLoaderComponent } from '../shared/components/pacman-loader/pacman-loader.component';
import { PrimaryButtonComponent } from '../shared/components/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../shared/components/secondary-button/secondary-button.component';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';
import { SelectPopoverComponent } from '../shared/components/select-popover/select-popover.component';
@NgModule({
  declarations: [
    TruncateMiddlePipe, 
    EthFormattingPipe,
    BlockiePipe,
    LoanStatePipe,
    LoanRequestStatePipe,
    RoundingPipe,
    IonicRatingComponent,
    NetworksPopoverComponent,
    WelcomeModalComponent,
    AssetTabComponent,
    LoadingModalComponent,
    ActionModalComponent,
    ProfilePopoverComponent,
    PageTitleComponent,
    PacmanLoaderComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    SnackbarComponent,
    SelectPopoverComponent,
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
    NetworksPopoverComponent,
    WelcomeModalComponent,
    AssetTabComponent,
    LoadingModalComponent,
    ActionModalComponent,
    ProfilePopoverComponent,
    PageTitleComponent,
    PacmanLoaderComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    SnackbarComponent,
    SelectPopoverComponent,
  ]
})
export class SharedComponentsModule { }
