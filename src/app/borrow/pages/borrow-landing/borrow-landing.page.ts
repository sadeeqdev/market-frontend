import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, IonSelect } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CheddaBaseTokenVaultService } from 'src/app/contracts/chedda-base-token-vault.service';
import { PriceOracleService } from 'src/app/contracts/price-oracle.service';
import { LendingPool, Loan } from 'src/app/lend/lend.models';
import { VaultStatsService } from 'src/app/providers/vault-stats.service';
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
  currentSegment = 'items'
  accountSubscription?: Subscription
  account
  lendingPoolsSubscription:Subscription
  lendingPools: LendingPool[] = []
  currency
  vaultContract

  constructor(
    private wallet: WalletProviderService,
    private priceFeed: PriceOracleService,
    private vaultService: CheddaBaseTokenVaultService,
    private vaultStatsService: VaultStatsService
    
    ) { }
  
  async ngOnInit() {
    this.currency = environment.config.networkParams.nativeCurrency.name
    this.vaultContract = this.vaultService.contractAt(environment.config.contracts.CheddaBaseTokenVault)
    await this.vaultStatsService.loadVaultStats()
    this.registerEventListener()
  }

  onSegmentChanged(event) {
    this.currentSegment = this.segmentControl.value
  }

  async registerEventListener() {
    this.accountSubscription = this.wallet.accountSubject.subscribe(newAccount => {
      this.account = newAccount
    })

    this.lendingPoolsSubscription = this.vaultStatsService.lendingPoolsSubject.subscribe(lendingPools => {
      this.lendingPools = lendingPools
    })
  }
}
