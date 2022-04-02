import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSegment, IonSelect, NavController } from '@ionic/angular';
import { BigNumber, ethers } from 'ethers';
import { stat } from 'fs';
import { Subscription } from 'rxjs';
import { CheddaBaseTokenVaultService } from 'src/app/contracts/chedda-base-token-vault.service';
import { CheddaLoanManagerService, LoanRequestStatus, LoanStatus } from 'src/app/contracts/chedda-loan-manager.service';
import { CheddaXpService } from 'src/app/contracts/chedda-xp.service';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { LendingPool, Loan } from 'src/app/lend/lend.models';
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
  loans: Loan[] = []
  lendingPools: LendingPool[] = []
  currency
  vaultContract
  ratePrecision = 100000

  constructor(
    private explorer: MarketExplorerService,
    private wallet: WalletProviderService,
    private loanManager: CheddaLoanManagerService,
    private marketExplorer: MarketExplorerService,
    private vaultService: CheddaBaseTokenVaultService,
    ) { }
  
  async ngOnInit() {
    this.lendingPools = environment.config.pools
    this.vaultContract = this.vaultService.contractAt(environment.config.contracts.CheddaBaseTokenVault)
    await this.loadVaultStats()
    this.registerEventListener()
    this.currency = environment.config.networkParams.nativeCurrency.name
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

  private async loadVaultStats() {
    this.lendingPools = environment.config.pools
    try {
      this.lendingPools.forEach(async pool => {
        await this.loadStats(pool)
      }); 
    } catch (error) {
      console.error('caught error: ', error)
    }
  }

  private async loadStats(pool: LendingPool) {
    const contract = this.vaultService.contractAt(pool.address) 
    console.log('contract is for: ', contract.address)

    const stats = await this.vaultService.getVaultStats(contract)
    console.log('stats = ', stats)
    pool.stats = {
      supplied: BigNumber.from(1010101),
      utilization: stats.utilization.toNumber()/this.ratePrecision,
      apr: stats.depositApr/this.ratePrecision,
      total: ethers.utils.formatEther(stats.liquidity)
    }
  }

  onSegmentChanged(event) {
    this.currentSegment = this.segmentControl.value
  }

  async onFilterChanged(event) {
    this.filter = this.filterSelect.value
    switch (this.filter) {
      case 'pending':
        this.getPendingLoans(LoanRequestStatus.open)
        break;
      case 'open':
        this.getLoans(LoanStatus.open)
        break
      case 'repaid':
        this.getLoans(LoanStatus.repaid)
        break
      case 'foreclosed':
        this.getLoans(LoanStatus.foreclosed)
        break
      default:
        break;
    }
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
      const pendingLoans = await this.loanManager.getLoanRequests(this.wallet.currentAccount, status)
      this.pendingLoans = await Promise.all(pendingLoans.map(async pending => {
        const nft = await this.marketExplorer.assembleNFT(pending.nftContract, pending.tokenID.toString())
        return {
          ...pending,
          nft
        }
      }))
    } catch (err) {
      console.error(err)
    }
  }

  async getLoans(status: LoanStatus) {
    try {
      const loans = await this.loanManager.getLoansBorrowedByAddress(this.wallet.currentAccount, status)
      this.loans = await Promise.all(loans.map(async loan => {
        const nft = await this.marketExplorer.assembleNFT(loan.nftContract, loan.tokenID.toString())
        return {
          ...loan,
          nft
        }
      }))
      console.log('loans are: ', this.loans)
    } catch (error) {
      console.error('error: ', error)
    }
  }

}
