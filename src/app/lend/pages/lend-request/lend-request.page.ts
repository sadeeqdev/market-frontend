import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonButton, NavController, ToastController, ModalController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CheddaLoanManagerService } from 'src/app/contracts/chedda-loan-manager.service';
import { CheddaMarketService } from 'src/app/contracts/chedda-market.service';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { NFT } from 'src/app/nfts/models/nft.model';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { environment } from 'src/environments/environment';
import { LoanRequest } from '../../lend.models';

@Component({
  selector: 'app-lend-request',
  templateUrl: './lend-request.page.html',
  styleUrls: ['./lend-request.page.scss'],
})
export class LendRequestPage implements OnInit, OnDestroy {
  @ViewChild('lendButton') buyButton: IonButton
  priceString = ''
  nft: NFT
  numberOfLikes
  account

  listingExists = false
  iAmOwner = false
  txPending = false
  canCollateralize = false
  env = environment
  request?: LoanRequest
  currency

  private routeSubscription?: Subscription
  private loanSubscription?: Subscription

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private wallet: WalletProviderService,
    private alert: GlobalAlertService,
    private market: CheddaMarketService,
    private marketExplorer: MarketExplorerService,
    private loanManager: CheddaLoanManagerService,
  ) { }

  ngOnInit() {
    this.currency = environment.config.networkParams.nativeCurrency.symbol
    this.registerRouteSubscription()
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe()
    this.loanSubscription?.unsubscribe()
  }

  private async registerRouteSubscription() {
    this.routeSubscription = this.route.paramMap.subscribe(async paramMap => {
      if (!paramMap.has('requestId')) {
        this.navController.navigateBack('/lend')
        return
      }

      try {
        const requestID = paramMap.get('requestId')
        const loanRequest = await this.loanManager.getLoanRequestById(requestID)
        const tokenURI = await this.market.getTokenURI(loanRequest.nftContract, loanRequest.tokenID.toString())
        this.nft = await this.marketExplorer.assembleNFT(loanRequest.nftContract, loanRequest.tokenID.toString(), tokenURI)
        this.request = loanRequest
      } catch (error) {
        console.error('error getting nft from loan request: ', error)
        this.navController.navigateBack('/lend')
      }
    })

    this.loanSubscription = this.loanManager.loanOpenedSubject?.subscribe(result => {
      console.log('loanSubscription got: ', result)
      if (result.requestID == this.request.requestID) {
        this.showLoanOpenedAlert()
      }
    })
  }

  async onLendButtonClicked() {
    try {
      if (!this.wallet.isConnected || !this.wallet.currentAccount) {
        this.alert.showConnectAlert()
        return
      }
      let hasEnough = await this.wallet.balanceIsOver(this.request.amount)
      if (!hasEnough) {
        this.alert.showInsufficientBalanceAlert()
        return
      }
      await this.offerLoan()
    } catch (error) {
      console.error('error opening loan: ', error)
    }
  }

  async showLoanOpenedAlert() {
    await this.alert.showOkayAlert('Loan Opened', 'You can keep track of this loan under your open loans.')
  }

  private async offerLoan() {
    this.txPending = true
    await this.loanManager.openLoan(this.request.requestID, this.request.amount)
  }

}
