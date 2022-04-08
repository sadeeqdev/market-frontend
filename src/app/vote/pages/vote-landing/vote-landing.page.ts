import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { BigNumber, ethers } from 'ethers';
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

    // this.lendingPools.forEach(async p => {
    //   let vaultContract = this.vaultContract.contractAt(p.address)
    //   let gaugeAddress = await this.vaultService.gauge(vaultContract)
    //   let votes = await this.gaugeController.gaugeVotes(gaugeAddress)
    //   p.votes = votes
    //   return p
    // })


    this.lendingPools = await Promise.all(this.lendingPools.map(async p => {
      let vaultContract = this.vaultService.contractAt(p.address)
      let gaugeAddress = await this.vaultService.gauge(vaultContract)
      let votes = await this.gaugeController.gaugeVotes(gaugeAddress)
      p.votes = votes
      return p
    }))
    let voteShare = await Promise.all(this.lendingPools.map(async p => {
      return Number(ethers.utils.formatEther(p.votes)) / 100
    }))
    this.chartData = {
      labels: this.chartLabels,
      datasets: [
        { 
          // data: [25, 25, 25, 25],
          data: voteShare
        },
      ]
    }
    console.log('voteShare = ', voteShare)
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
