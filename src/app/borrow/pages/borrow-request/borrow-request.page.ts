import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonButton, NavController, ToastController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { BigNumber } from 'ethers';
import { from, Subscription } from 'rxjs';
import { NftLikeModalComponent } from 'src/app/components/nft-like-modal/nft-like-modal.component';
import { CheddaLoanManagerService } from 'src/app/contracts/chedda-loan-manager.service';
import { CheddaMarketService } from 'src/app/contracts/chedda-market.service';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { Loan, LoanRequest, LoanRequestState } from 'src/app/lend/lend.models';
import { NFT } from 'src/app/nfts/models/nft.model';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { ZeroAddress } from 'src/app/shared/constants';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { environment } from 'src/environments/environment';
import { GetLoanModalComponent } from '../../components/get-loan-modal/get-loan-modal.component';

@Component({
  selector: 'app-borrow-request',
  templateUrl: './borrow-request.page.html',
  styleUrls: ['./borrow-request.page.scss'],
})
export class BorrowRequestPage implements OnInit {

  @ViewChild('buyButton') buyButton: IonButton
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
  loan?: Loan
  currency

  private routeSubscription?: Subscription
  private accountSubscription?: Subscription
  private requestCancelledSubscription?: Subscription

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController,
    private wallet: WalletProviderService,
    private alert: GlobalAlertService,
    private market: CheddaMarketService,
    private marketExplorer: MarketExplorerService,
    private loanManager: CheddaLoanManagerService,
    ) { }

  async ngOnInit() {
    this.currency = environment.config.networkParams.nativeCurrency.name
    await this.subscribeToRouteChanges()
    await this.registerEventListeners()
  }

  ngOnDestroy(): void {
      this.routeSubscription?.unsubscribe()
      this.accountSubscription?.unsubscribe()
      this.requestCancelledSubscription?.unsubscribe
  }

  async onCancelRequest() {
    try {
      if (this.wallet.isConnected && this.request) {
        this.txPending = true
        await this.loanManager.cancelRequest(this.request.requestID)
      } else {
        this.alert.showConnectAlert()
      }
    } catch (error) {
      this.txPending = false
      this.alert.showErrorAlert(error)
    }
  }

  async onLikeClicked() {
    const modal = await this.modalController.create({
      component: NftLikeModalComponent,
      cssClass: 'stack-modal',
      showBackdrop: true,
      componentProps: {
        nft: this.nft
      }
    })
    modal.onDidDismiss().then(async (result) => {
      if (result && result.data) {
        await this.showConfirmAlert(result.data)
        setTimeout(() => {
          this.loadLikes()
        }, 3000)
      }
    })
    await modal.present()
  }

  async onGetLoanClicked() {
    const modal = await this.modalController.create({
      component: GetLoanModalComponent,
      cssClass: 'stack-modal',
      showBackdrop: true,
      componentProps: {
        nft: this.nft
      }
    })
    modal.onDidDismiss().then(async (result) => {
      console.log('dismiss result i s', result)
      if (result && result.data && result.data.loanRequested) {
        this.txPending = true
      }
    })
    await modal.present() 
  }

  async onRepayLoanClicked() {
    if (!this.loan) {
      return
    } 

    await this.loanManager.repayLoan(this.loan.loanID, this.loan.repaymentAmount)
  }

  private async subscribeToRouteChanges() {
    this.routeSubscription = this.route.paramMap.subscribe(async paramMap => {
      if (!paramMap.has('nftContract') || !paramMap.has('tokenID')) {
        this.navController.navigateBack('/borrow')
        return
      }
      try {
        const nftContract = paramMap.get('nftContract')
        const tokenID = paramMap.get('tokenID')

        let nft = await this.marketExplorer.assembleNFT(nftContract, tokenID)
        if (!nft) {
          this.navController.navigateBack('/borrow')
          return
        }
        this.nft = nft
        this.loadLoanRequestForNFT(nftContract, tokenID)
        this.loanLoanForNFT(nftContract, tokenID)
        this.loadLikes()
        await this.checkOwner(nftContract, tokenID)
        if (!this.request || this.request.state == LoanRequestState.all) {
          this.canCollateralize = true
        }
      } catch (error) {
        //todo: show error before navigating back
        console.error('caught error: ', error)
        this.navController.navigateBack('/borrow')
      }
    })
  }


  private async loadLikes() {
    this.numberOfLikes = await this.marketExplorer.getItemLikes(this.nft.nftContract, this.nft.tokenID)
  }

  private async showToast(title: string, message: string) {
    const toast =  await this.toastController.create({
      header: title,
      message: message,
      position: 'bottom',
      duration: 5000
    })

    await toast.present() 
  }

  private async showConfirmAlert(amount) {
    await this.alert.showRewardConfirmationAlert(amount)
  }

  private async loadLoanRequestForNFT(nftContract, tokenID) {
    let loanRequest: LoanRequest = await this.loanManager.getOpenLoanRequest(nftContract, tokenID)
    console.log('loanRequest = ', loanRequest)
    if (loanRequest && loanRequest.requestID && !loanRequest.requestID.isZero()) {
      this.request = loanRequest
    }
  }

  private async loanLoanForNFT(nftContract, tokenID) {
    let loan: Loan = await this.loanManager.getOpenLoan(nftContract, tokenID)
    if (loan && loan.loanID && !loan.loanID.isZero()) {
      console.log('loan = ', loan)
      this.loan = loan
    }
  }

  private registerEventListeners() {
    this.loanManager.requestCancelledSubject?.subscribe((event) => {
      console.log('got cancel event: ', event)
      console.log('event.requestId, request.requestID: ', event.requestId, this.request.requestID)
      if (this.request && event.requestId.eq(this.request.requestID)) {
        this.canCollateralize = true
        this.request = null
        this.txPending = false
        this.alert.showToast('Loan request cancelled')
      } else {
        console.log('no match')
      }
    })

    this.loanManager.loanRequestSubject?.subscribe(async event => {
      console.log('event.tokenID, nft.tokenID: ', event.tokenID, this.nft.tokenID)
      console.log('event.contractAddress, this.nft.nftContract: ', event.contractAddress, this.nft.nftContract)
      if (event.contractAddress == this.nft.nftContract && event.tokenID.toString() == this.nft.tokenID) {
        console.log('match')
        this.canCollateralize = false
        this.txPending = false
        this.alert.showToast('Loan requested')
        await this.loadLoanRequestForNFT(this.nft.nftContract, this.nft.tokenID)
      } else {
        console.log('no match')
      }
    })
  }

  private async checkOwner(nftContract: string, tokenID: string) {
    const nft = this.loanManager.getNFTContract(nftContract)
    let owner = await nft.ownerOf(tokenID)
    console.log('owner = ', owner)
  }
}
