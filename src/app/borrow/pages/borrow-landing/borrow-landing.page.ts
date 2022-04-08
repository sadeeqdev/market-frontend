import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, IonSelect, NavController } from '@ionic/angular';
import { BigNumber, ethers } from 'ethers';
import { Subscription } from 'rxjs';
import { CheddaBaseTokenVaultService } from 'src/app/contracts/chedda-base-token-vault.service';
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
  borrowPrecision = BigNumber.from(1000000000000)
  aprPrecision = BigNumber.from(100000000000)

  constructor(
    private wallet: WalletProviderService,
    private vaultService: CheddaBaseTokenVaultService,
    ) { }
  
  async ngOnInit() {
    this.lendingPools = environment.config.pools
    this.vaultContract = this.vaultService.contractAt(environment.config.contracts.CheddaBaseTokenVault)
    await this.loadVaultStats()
    this.registerEventListener()
    this.currency = environment.config.networkParams.nativeCurrency.name
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
      total: ethers.utils.formatEther(stats.liquidity),
      utilization: ethers.utils.formatEther(stats.utilization.mul(100)),
      apr: ethers.utils.formatEther(stats.depositApr.mul(1000)), // todo: Should be .mul(100)
    //rewardsApy: ethers.utils.formatEther(stats.rewardsApr.mul(100))
    }
  }

  onSegmentChanged(event) {
    this.currentSegment = this.segmentControl.value
  }


  async registerEventListener() {
    this.accountSubscription = this.wallet.accountSubject.subscribe(newAccount => {
      this.account = newAccount
    })
  }
}
