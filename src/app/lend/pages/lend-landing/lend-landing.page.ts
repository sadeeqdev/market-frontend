import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { ethers } from 'ethers';
import { CheddaLoanManagerService, LoanRequestStatus, LoanStatus } from 'src/app/contracts/chedda-loan-manager.service';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { environment } from 'src/environments/environment';
import { Loan, LoanRequest } from '../../lend.models';

@Component({
  selector: 'app-lend-landing',
  templateUrl: './lend-landing.page.html',
  styleUrls: ['./lend-landing.page.scss'],
})
export class LendLandingPage implements OnInit {

  @ViewChild('segmentControl') segmentControl: IonSegment

  loanRequests: LoanRequest[] = []
  myLoans: Loan[] = []
  currentSegment = 'requests'
  currency

  constructor(
    private wallet: WalletProviderService,
    private marketExplorer: MarketExplorerService,
    private loanManager: CheddaLoanManagerService) { }

  async ngOnInit() {
    this.currency = environment.config.networkParams.nativeCurrency.symbol
    await this.fetchLoanRequests()
    await this.fetchMyLoans()
  }

  async fetchLoanRequests() {
    try {
      const requests = await this.loanManager.getLoanRequests(ethers.constants.AddressZero, LoanRequestStatus.open)
      this.loanRequests = await Promise.all(requests.map(async pending => {
        const nft = await this.marketExplorer.assembleNFT(pending.nftContract, pending.tokenID.toString())
        return {
          ...pending,
          nft
        }
      }))
    } catch (error) {
      console.log('error fetching loan requests: ', error)
    }
  }

  async fetchMyLoans() {
    if (!this.wallet.currentAccount) {
      return
    }
    try {
      let loans = await this.loanManager.getLoansLentByAddress(this.wallet.currentAccount, LoanStatus.open)
      this.myLoans = await Promise.all(loans.map(async pending => {
        const nft = await this.marketExplorer.assembleNFT(pending.nftContract, pending.tokenID.toString())
        return {
          ...pending,
          nft
        }
      }))
    } catch (error) {
      console.error('error fetching my loans: ', error)
    }
  }

  onSegmentChanged(event) {
    this.currentSegment = this.segmentControl.value
  }

}
