import { Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';
import { CheddaBaseTokenVaultService } from 'src/app/contracts/chedda-base-token-vault.service';
import { PriceOracleService } from 'src/app/contracts/price-oracle.service';
import { LendingPool, Loan } from 'src/app/lend/lend.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaultStatsService {
  items = []
  pools: LendingPool[] = []
  lendingPoolsSubject : BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(
    private priceFeed: PriceOracleService,
    private vaultService: CheddaBaseTokenVaultService,
  ) { }

  async loadVaultStats() {
    this.pools = environment.config.pools
    this.lendingPoolsSubject.next(this.pools)
    try {
      this.pools.forEach(async pool => {
        await this.loadStats(pool)

      }); 
    } catch (error) {
      console.error('caught error: ', error)
    }
  }

  private async loadStats(pool: LendingPool) {
    const contract = this.vaultService.contractAt(pool.address) 
    const price = await this.priceFeed.getAssetPrice(pool.asset.address)
    const stats = await this.vaultService.getVaultStats(contract)
    pool.stats = {
      supplied: BigNumber.from(1010101),
      total: ethers.utils.formatEther(stats.liquidity.mul(price).div(BigNumber.from(10).pow(18))),
      utilization: ethers.utils.formatEther(stats.utilization.mul(100)),
      apr: ethers.utils.formatEther(stats.depositApr.mul(1000)), // todo: Should be .mul(100)
    }
  }
}