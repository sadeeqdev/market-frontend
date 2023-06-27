import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CheddaBaseTokenVaultService } from 'src/app/contracts/chedda-base-token-vault.service';
import { VaultStatsService } from 'src/app/providers/vault-stats.service';
import { EnvironmentProviderService } from 'src/app/providers/environment-provider.service';import { LendingPool } from '../../lend.models';

@Component({
  selector: 'app-lend-landing',
  templateUrl: './lend-landing.page.html',
  styleUrls: ['./lend-landing.page.scss'],
})
export class LendLandingPage implements OnInit, OnDestroy {

  @ViewChild('segmentControl') segmentControl: IonSegment;

  currentSegment = 'requests';
  currency;
  openLoansSubscription?: Subscription;
  openLoanRequestsSubscription?: Subscription;
  lendingPools: LendingPool[] = [];
  vaultContract;
  lendingPoolsSubscription: Subscription;
  
  constructor(
    private vaultService: CheddaBaseTokenVaultService,
    private vaultStatsService: VaultStatsService,
    private environmentService: EnvironmentProviderService,
    ) {
  }

  async ngOnInit() {
    this.currency = this.environmentService.environment.config.networkParams.nativeCurrency.symbol;

    this.vaultContract = this.vaultService.contractAt(
      this.environmentService.environment.config.contracts.CheddaBaseTokenVault
    );
    await this.vaultStatsService.loadVaultStats()
    this.registerEventListener()
  }

  async ngOnDestroy() {
    this.openLoansSubscription?.unsubscribe();
    this.openLoanRequestsSubscription?.unsubscribe();
    this.lendingPoolsSubscription?.unsubscribe();
  }

  onSegmentChanged(event) {
    this.currentSegment = this.segmentControl.value;
  }

  async registerEventListener(){
    this.lendingPoolsSubscription = this.vaultStatsService.lendingPoolsSubject.subscribe(lendingPools => {
      this.lendingPools = lendingPools
    })
  }
}
