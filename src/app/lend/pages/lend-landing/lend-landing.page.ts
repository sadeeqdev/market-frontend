import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { BigNumber, ethers } from 'ethers';
import { Subscription } from 'rxjs';
import { CheddaBaseTokenVaultService } from 'src/app/contracts/chedda-base-token-vault.service';
import { CheddaLoanManagerService, LoanRequestStatus, LoanStatus } from 'src/app/contracts/chedda-loan-manager.service';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { environment } from 'src/environments/environment';
import { LendingPool, Loan, LoanRequest } from '../../lend.models';

@Component({
  selector: 'app-lend-landing',
  templateUrl: './lend-landing.page.html',
  styleUrls: ['./lend-landing.page.scss'],
})
export class LendLandingPage implements OnInit, OnDestroy {

  @ViewChild('segmentControl') segmentControl: IonSegment

  loanRequests: LoanRequest[] = []
  myLoans: Loan[] = []
  currentSegment = 'requests'
  currency
  openLoansSubscription?: Subscription
  openLoanRequestsSubscription?: Subscription
  lendingPools: LendingPool[] = []
  vaultContract
  ratePrecision = 100000

  constructor(
    private wallet: WalletProviderService,
    private marketExplorer: MarketExplorerService,
    private loanManager: CheddaLoanManagerService,
    private vaultService: CheddaBaseTokenVaultService) { }

  async ngOnInit() {
    this.currency = environment.config.networkParams.nativeCurrency.symbol

    this.vaultContract = this.vaultService.contractAt(environment.config.contracts.CheddaBaseTokenVault)
    await this.loadVaultStats()
    await this.fetchLoanRequests()
    await this.fetchMyLoans()
    await this.listenToChanges()
    this.lendingPools = environment.config.pools

  }

  async ngOnDestroy() {
    this.openLoansSubscription?.unsubscribe()
    this.openLoanRequestsSubscription?.unsubscribe()
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
      const loans = await this.loanManager.getLoansLentByAddress(this.wallet.currentAccount, LoanStatus.open)
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

  async listenToChanges() {
    this.openLoanRequestsSubscription = this.loanManager.openLoanRequestsSubject.subscribe(async loanRequests => {
      console.log('got loan requests : ', loanRequests)
      if (loanRequests) {
        this.loanRequests = await Promise.all(loanRequests.map(async pending => {
          const nft = await this.marketExplorer.assembleNFT(pending.nftContract, pending.tokenID.toString())
          return {
            ...pending,
            nft
          }
        }))
      }
    })

    this.openLoansSubscription = this.loanManager.myLoansSubject?.subscribe(async loans => {
      if (loans) {
        this.myLoans = await Promise.all(loans.map(async pending => {
          const nft = await this.marketExplorer.assembleNFT(pending.nftContract, pending.tokenID.toString())
          return {
            ...pending,
            nft
          }
        }))
      }
    })
  }

  onSegmentChanged(event) {
    this.currentSegment = this.segmentControl.value
  }

}
