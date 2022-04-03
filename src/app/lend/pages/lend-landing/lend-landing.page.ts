import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { BigNumber, ethers } from 'ethers';
import { Subscription } from 'rxjs';
import { CheddaBaseTokenVaultService } from 'src/app/contracts/chedda-base-token-vault.service';
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
  currentSegment = 'requests'
  currency
  openLoansSubscription?: Subscription
  openLoanRequestsSubscription?: Subscription
  lendingPools: LendingPool[] = []
  vaultContract
  ratePrecision = 100000

  constructor(
    private wallet: WalletProviderService,
    private vaultService: CheddaBaseTokenVaultService) { }

  async ngOnInit() {
    this.currency = environment.config.networkParams.nativeCurrency.symbol

    this.vaultContract = this.vaultService.contractAt(environment.config.contracts.CheddaBaseTokenVault)
    await this.loadVaultStats()
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

  onSegmentChanged(event) {
    this.currentSegment = this.segmentControl.value
  }
}
