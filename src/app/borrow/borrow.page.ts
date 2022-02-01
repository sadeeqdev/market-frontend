import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSegment, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheddaLoanManagerService, LoanRequestStatus, LoanStatus } from '../contracts/chedda-loan-manager.service';
import { CheddaXpService } from '../contracts/chedda-xp.service';
import { MarketExplorerService } from '../contracts/market-explorer.service';
import { WalletProviderService } from '../providers/wallet-provider.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.page.html',
  styleUrls: ['./borrow.page.scss'],
})
export class BorrowPage implements OnInit {

  @ViewChild('segmentControl') segmentControl: IonSegment
  items = []
  currentSegment = 'items'
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
    // try {
    //   await this.fetchItems()
    // } catch (err) {
    //   console.error('navigation error: ', err)
    //   this.navController.navigateBack('/')
    // }
  }

  async fetchItems() {
    if (this.account) {
      this.items = await this.explorer.loadItemsOwned(this.account)
      await this.getPendingLoans(LoanRequestStatus.all)
      await this.getLoans(LoanStatus.all)
    }
  }
  onSegmentChanged(event) {
    this.currentSegment = this.segmentControl.value
  }

  onFilterChanged(event) {}

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
