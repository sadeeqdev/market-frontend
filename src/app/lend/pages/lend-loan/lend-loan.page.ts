import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonButton, NavController } from '@ionic/angular';
import { ethers } from 'ethers';
import { Subscription } from 'rxjs';
import { CheddaLoanManagerService } from 'src/app/contracts/chedda-loan-manager.service';
import { CheddaMarketService } from 'src/app/contracts/chedda-market.service';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { PriceConsumerService } from 'src/app/contracts/price-consumer.service';
import { NFT } from 'src/app/nfts/models/nft.model';
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

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private market: CheddaMarketService,
    private marketExplorer: MarketExplorerService,
    private loanManager: CheddaLoanManagerService,
    private priceConsumer: PriceConsumerService,
  ) { }

  ngOnInit() {
    this.registerRouteSubscription()
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe()
    this.loanSubscription?.unsubscribe()
  }

  foreclose() {

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
      } catch (error) {
        console.error('error getting nft from loan request: ', error)
        this.navController.navigateBack('/lend')
      }
    })

    this.loanSubscription = this.loanManager.loanOpenedSubject?.subscribe(result => {
      console.log('loanSubscription got: ', result)
      if (result.requestID == this.loan.loanID) {
        this.showLoanOpenedAlert()
      }
    })
  }

  private showLoanOpenedAlert() {}
}
