import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonButton, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CheddaLoanManagerService } from 'src/app/contracts/chedda-loan-manager.service';
import { CheddaMarketService } from 'src/app/contracts/chedda-market.service';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { NFT } from 'src/app/nfts/models/nft.model';
import { environment } from 'src/environments/environment';
import { Loan, LoanRequest } from '../../lend.models';

@Component({
  selector: 'app-lend-loan',
  templateUrl: './lend-loan.page.html',
  styleUrls: ['./lend-loan.page.scss'],
})
export class LendLoanPage implements OnInit {
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

  private routeSubscription?: Subscription
  private loanSubscription?: Subscription

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private market: CheddaMarketService,
    private marketExplorer: MarketExplorerService,
    private loanManager: CheddaLoanManagerService,
  ) { }

  ngOnInit() {
    this.registerRouteSubscription()
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
        const loan = await this.loanManager.getLoanById(loanID)
        this.nft = await this.marketExplorer.assembleNFT(loan.nftContract, loan.tokenID.toString())
        this.loan = loan
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
