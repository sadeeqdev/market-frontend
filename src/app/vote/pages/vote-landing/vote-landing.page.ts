import { Component, OnInit } from '@angular/core';
import { CheddaBaseTokenVaultService } from 'src/app/contracts/chedda-base-token-vault.service';
import { LendingPool } from 'src/app/lend/lend.models';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vote-landing',
  templateUrl: './vote-landing.page.html',
  styleUrls: ['./vote-landing.page.scss'],
})
export class VoteLandingPage implements OnInit {
  currency
  lendingPools: LendingPool[] = []
  vaultContract
  ratePrecision = 100000
  constructor(
    private wallet: WalletProviderService,
    private vaultService: CheddaBaseTokenVaultService) { }

  async ngOnInit() {
    this.currency = environment.config.networkParams.nativeCurrency.symbol

    this.vaultContract = this.vaultService.contractAt(environment.config.contracts.CheddaBaseTokenVault)
    this.lendingPools = environment.config.pools

  }

  async ngOnDestroy() {
  }

}
