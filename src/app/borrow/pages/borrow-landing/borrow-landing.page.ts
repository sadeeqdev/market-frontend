import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSegment, IonSelect, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CheddaLoanManagerService, LoanRequestStatus, LoanStatus } from 'src/app/contracts/chedda-loan-manager.service';
import { CheddaXpService } from 'src/app/contracts/chedda-xp.service';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-borrow-landing',
  templateUrl: './borrow-landing.page.html',
  styleUrls: ['./borrow-landing.page.scss'],
})
export class BorrowLandingPage implements OnInit {
  @ViewChild('segmentControl') segmentControl: IonSegment
  @ViewChild('filterSelect') filterSelect: IonSelect
  items = []
  currentSegment = 'items'
  filter = 'pending'
  accountSubscription?: Subscription
  account
  requestColumns = [
    {
      name: 'Asset',
      prop: '',
      flexGrow: 1,
    },
    {
      name: 'Requested',
      prop: 'amount',
      flexGrow: 2,
    }, 
    {
      name: 'Period',
      prop: 'duration',
      flexGrow: 1,
    },
  ]

  pendingLoans = []
  loans = []
  currency
  
  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private explorer: MarketExplorerService,
    private wallet: WalletProviderService,
    private loanManager: CheddaLoanManagerService,
    private cheddaXP: CheddaXpService,
    ) { }
  
  async ngOnInit() {
    this.registerEventListener()
    this.currency = environment.config.networkParams.nativeCurrency.name
    console.log('ngoninit')
    // try {
    //   await this.fetchItems()
    // } catch (err) {
    //   console.error('navigation error: ', err)
    //   this.navController.navigateBack('/')
    // }
  }

  async fetchItems() {
    if (this.account) {
      console.log('account = ', this.account)
      this.items = await this.explorer.loadItemsOwned(this.account)
      await this.getPendingLoans(LoanRequestStatus.open)
      await this.getLoans(LoanStatus.open)
    } else {
      console.log('no account')
    }
  }
  onSegmentChanged(event) {
    this.currentSegment = this.segmentControl.value
  }

  onFilterChanged(event) {
    this.filter = this.filterSelect.value
  }

  async registerEventListener() {
    this.accountSubscription = this.wallet.accountSubject.subscribe(newAccount => {
      this.account = newAccount
      this.fetchItems()
    })
  }

  private async getPendingLoans(status: LoanRequestStatus) {
    if (!this.wallet.currentAccount) {
      return
    }

    try {
      this.pendingLoans = await this.loanManager.getLoanRequests(this.wallet.currentAccount, status)
    } catch (err) {
      console.error(err)
    }
  }

  async getOpenLoans() {

  }

  async getLoans(status: LoanStatus) {
  }

}
