import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { CheddaBaseTokenVaultService } from 'src/app/contracts/chedda-base-token-vault.service';
import { GaugeControllerService } from 'src/app/contracts/gauge-controller.service';
import { LendingPool } from 'src/app/lend/lend.models';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
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
  chartLabels
  chartData
  canVote = true

  public chartType: ChartType = 'doughnut';
  constructor(
    private wallet: WalletProviderService,
    private gaugeController: GaugeControllerService,
    private alert: GlobalAlertService,
    private vaultService: CheddaBaseTokenVaultService) { }

  async ngOnInit() {
    this.currency = environment.config.networkParams.nativeCurrency.symbol

    this.vaultContract = this.vaultService.contractAt(environment.config.contracts.CheddaBaseTokenVault)
    this.lendingPools = environment.config.pools
    this.loadGaugeData()
  }

  async loadGaugeData() {
    this.chartLabels = this.lendingPools.map(p => p.name)
    this.chartData = {
      labels: this.chartLabels,
      datasets: [
        { data: [ 25, 25, 25, 25],
        },
      ]
    }
  }

  async ngOnDestroy() {
  }

  async vote(pool) {
    console.log('voting')
    try {
      const vaultContract = this.vaultService.contractAt(pool.address)
      const gaugeAddress = await this.vaultService.gauge(vaultContract)
      await this.gaugeController.vote(gaugeAddress)
      this.canVote = false
    } catch (error) {
      this.alert.showErrorAlert(error)
    }
  }

  async claim(pool) {
    console.log('claim')
  }

}
