import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { ethers } from 'ethers';
import { CheddaLoanManagerService, LoanRequestStatus, LoanStatus } from 'src/app/contracts/chedda-loan-manager.service';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
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

  constructor(
    private wallet: WalletProviderService,
    private loanManager: CheddaLoanManagerService) { }

  async ngOnInit() {
    await this.fetchLoanRequests()
    await this.fetchMyLoans()
  }

  async fetchLoanRequests() {
    try {
      this.loanRequests = await this.loanManager.getLoanRequests(ethers.constants.AddressZero, LoanRequestStatus.open)
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
      this.myLoans = loans
    } catch (error) {
      console.error('error fetching my loans: ', error)
    }
  }

  onSegmentChanged(event) {
    this.currentSegment = this.segmentControl.value
  }

}
