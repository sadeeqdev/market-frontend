import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { BigNumber, ethers } from 'ethers';
import { Subscription } from 'rxjs';
import { CheddaBaseTokenVaultService } from 'src/app/contracts/chedda-base-token-vault.service';
import { PriceOracleService } from 'src/app/contracts/price-oracle.service';
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
  utilizationPrecision = BigNumber.from(1000000000000)
  aprPrecision = BigNumber.from(100000000000)

  constructor(
    private wallet: WalletProviderService,
    private priceFeed: PriceOracleService,
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

    console.log('getting price for ', pool.asset.address)
    const price = await this.priceFeed.getAssetPrice(pool.asset.address)
    console.log(`***price of = ${pool.asset.address} = ${ethers.utils.formatEther(price)}`)

    const stats = await this.vaultService.getVaultStats(contract)
    pool.stats = {
      supplied: BigNumber.from(1010101),
      total: ethers.utils.formatEther(stats.liquidity.mul(price).div(BigNumber.from(10).pow(18))),
      utilization: ethers.utils.formatEther(stats.utilization.mul(100)),
      apr: ethers.utils.formatEther(stats.depositApr.mul(1000)), // todo: Should be .mul(100)
    //rewardsApy: ethers.utils.formatEther(stats.rewardsApr.mul(100))
    }
  }

  onSegmentChanged(event) {
    this.currentSegment = this.segmentControl.value
  }
}
