import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonButton, NavController } from '@ionic/angular';
import { ethers } from 'ethers';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { CheddaLoanManagerService } from 'src/app/contracts/chedda-loan-manager.service';
import { CheddaMarketService } from 'src/app/contracts/chedda-market.service';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { PriceConsumerService } from 'src/app/contracts/price-consumer.service';
import { NFT } from 'src/app/nfts/models/nft.model';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { environment } from 'src/environments/environment';
import { Loan, LoanRequest } from '../../lend.models';

@Component({
  selector: 'app-lend-loan',
  templateUrl: './lend-loan.page.html',
  styleUrls: ['./lend-loan.page.scss'],
})
export class LendLoanPage implements OnInit, OnDestroy {
  @ViewChild('lendButton') buyButton: IonButton
  priceString = ''
  nft: NFT
  numberOfLikes
  account

  listingExists = false
  iAmOwner = false
  txPending = false
  canForeclose = false
  env = environment
  loan?: Loan
  currency
  loanAmountUSD
  loanRepaymentUSD

  private routeSubscription?: Subscription
  private loanSubscription?: Subscription
  private forecloseSubscription?: Subscription

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private market: CheddaMarketService,
    private marketExplorer: MarketExplorerService,
    private loanManager: CheddaLoanManagerService,
    private priceConsumer: PriceConsumerService,
    private alert: GlobalAlertService,
  ) { }

  ngOnInit() {
    this.registerRouteSubscription()
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe()
    this.loanSubscription?.unsubscribe()
    this.forecloseSubscription?.unsubscribe()
  }

  async foreclose() {
    try {
      await this.loanManager.forecloseLoan(this.loan.loanID)
    } catch (error) {
      this.alert.showErrorAlert(error)
    }
  }

  private async registerRouteSubscription() {
    this.routeSubscription = this.route.paramMap.subscribe(async paramMap => {
      if (!paramMap.has('loanId')) {
        this.navController.navigateBack('/lend')
        return
      }

      try {
        const loanID = paramMap.get('loanId')
        const usdRate = await this.priceConsumer.latestPriceUSD()
        const loan = await this.loanManager.getLoanById(loanID)
        this.nft = await this.marketExplorer.assembleNFT(loan.nftContract, loan.tokenID.toString())
        this.loan = loan
        this.loanAmountUSD = this.priceConsumer.toUSD(ethers.utils.formatEther(loan.principal), usdRate, 2)
        this.loanRepaymentUSD = this.priceConsumer.toUSD(ethers.utils.formatEther(loan.repaymentAmount), usdRate, 2)
        const expiryDate = moment.unix(loan.expiresAt.toNumber())
        console.log('expiry date = ', expiryDate)
        this.canForeclose = expiryDate < moment()
      } catch (error) {
        console.error('error getting nft from loan request: ', error)
        this.navController.navigateBack('/lend')
      }
    })

    this.loanSubscription = this.loanManager.loanOpenedEventSubject?.subscribe(result => {
      console.log('loanSubscription got: ', result)
      if (result.requestID.eq(this.loan.loanID)) {
        this.showLoanOpenedAlert()
      }
    })

    this.forecloseSubscription = this.loanManager.loanForeclosedEventSubject?.subscribe(result => {
      if (result.loanID.eq(this.loan.loanID)) {
        this.txPending = false
        this.canForeclose = false
        this.alert.showToast('Loan Foreclosed. This NFT has been transferred to your account.')
      }
    })
  }

  private showLoanOpenedAlert() {}
}
