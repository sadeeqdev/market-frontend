import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChartType } from 'chart.js';
import { BigNumber, ethers } from 'ethers';
import moment from 'moment';
import { start } from 'repl';
import { Subscription } from 'rxjs';
import { CheddaBaseTokenVaultService } from 'src/app/contracts/chedda-base-token-vault.service';
import { CheddaService } from 'src/app/contracts/chedda.service';
import { GaugeControllerService } from 'src/app/contracts/gauge-controller.service';
import { LiqiudityGaugeService } from 'src/app/contracts/liqiudity-gauge.service';
import { VeCheddaService } from 'src/app/contracts/ve-chedda.service';
import { LendingPool } from 'src/app/lend/lend.models';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { LoadingModalComponent } from 'src/app/shared/components/loading-modal/loading-modal.component';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { EnvironmentProviderService } from 'src/app/providers/environment-provider.service';
@Component({
  selector: 'app-vote-landing',
  templateUrl: './vote-landing.page.html',
  styleUrls: ['./vote-landing.page.scss'],
})
export class VoteLandingPage implements OnInit, OnDestroy {
  currency
  lendingPools: LendingPool[] = []
  vaultContract
  ratePrecision = 100000
  chartLabels
  chartData
  canVote = true
  currentEpoch
  epochEnd
  hasEpochEnded
  loader?
  backgroundColor = ["#F3943D", "#FEF851", "#5DDEFA", "#6257F2", "#9C8DFF"]
  votePower
  voteEventSubscription?: Subscription
  rebalanceEventSubscription?: Subscription
  cheddaTransferSubscription?: Subscription
  options = {
    plugins: {
      cutoutPercentage: 80,
      legend: {
        display: false,
        position: "right",
        align: "start",
        labels: {
          boxWidth: 90,
          boxHeight: 25,
          borderRadius: 10,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        enabled: true
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
      animationDuration: 100
    }
  };
   chartLabelsWithBg = [
  //   {label: '', backgroundColor: 'bg-[#F3943D]'},
  //   {label: '', backgroundColor: 'bg-[#FEF851]'},
  //   {label: '', backgroundColor: 'bg-[#5DDEFA]'},
  //   {label: '', backgroundColor: 'bg-[#6257F2]'},
  //   {label: '', backgroundColor: 'bg-[#9C8DFF]'},
  ]
  
  public chartType: ChartType = 'doughnut';
  netWorkChangeSubscription: Subscription;
  constructor(
    private wallet: WalletProviderService,
    private gaugeController: GaugeControllerService,
    private liquidityGauge:LiqiudityGaugeService,
    private vaultService: CheddaBaseTokenVaultService,
    private alert: GlobalAlertService,
    private chedda: CheddaService,
    private veChedda: VeCheddaService,
    private modalController: ModalController,
    private environmentService: EnvironmentProviderService
    ) { }

  async ngOnInit() {
    this.currency = this.environmentService.environment.config.networkParams.nativeCurrency.symbol
    this.vaultContract = this.vaultService.contractAt(this.environmentService.environment.config.contracts.CheddaBaseTokenVault)
    this.lendingPools = this.environmentService.environment.config.pools
    await this.loadVeChedda()
    this.loadGaugeData()
    this.registerForEvents()
  }

  async ngOnDestroy() {
    this.voteEventSubscription?.unsubscribe()
    this.rebalanceEventSubscription?.unsubscribe()
    this.cheddaTransferSubscription?.unsubscribe()
    this.netWorkChangeSubscription?.unsubscribe()
  }

  async loadVeChedda() {
    if (this.wallet && this.wallet.currentAccount) {
      this.votePower = await this.veChedda.balanceOf(this.wallet.currentAccount)
    }
  }

  async loadGaugeData() {
    this.chartLabels = this.lendingPools.map(p => p.name)
    let mappedLabels = []
    for(let i = 0; i<this.backgroundColor.length; i++){
    mappedLabels.push({
        label: this.chartLabels[i],
        backgroundColor: `bg-[${this.backgroundColor[i]}]`
      })
    }
    this.chartLabelsWithBg = mappedLabels

    try {
      this.lendingPools = await Promise.all(this.lendingPools.map(async p => {
        let vaultContract = this.vaultService.contractAt(p.address)
        let gaugeAddress = await this.vaultService.gauge(vaultContract)
        let votes = await this.gaugeController.gaugeVotes(gaugeAddress) //TODO: error here
        p.votes = votes
        const gaugeContract = this.liquidityGauge.contractAt(gaugeAddress)
        if (this.wallet && this.wallet.currentAccount) {
          p.claimAmount = await this.liquidityGauge.claimAmount(gaugeContract, this.wallet.currentAccount)
        }
        return p
      }))
      this.currentEpoch = await this.gaugeController.currentEpoch()
      this.epochEnd = (this.currentEpoch.end.toString())
      this.hasEpochEnded = moment().isAfter(moment.unix(this.epochEnd))
      let voteShare = await Promise.all(this.lendingPools.map(async p => {
        return Number(ethers.utils.formatEther(p.votes))
      }))
      let allZeros = true
      for (let i = 0; i < voteShare.length; i++) {
        if (voteShare[i] != 0) {
          allZeros = false
          break
        }
      }
      if (allZeros) {
        voteShare = voteShare.map(v => {
          return 0.2
        })
      }
      this.chartData = {
        labels: this.chartLabels,
        datasets: [
          { 
            data: voteShare,
            backgroundColor: this.backgroundColor,
            borderWidth: 0,
            hoverOffset: 1
          },
        ]
      }
      console.log('voteShare = ', voteShare) 
    } catch (error) {
      console.log('error caught: ', error)
    }
  }

  async vote(pool) {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      const vaultContract = this.vaultService.contractAt(pool.address)
      const gaugeAddress = await this.vaultService.gauge(vaultContract)
      console.log('voting for gauge: ', gaugeAddress)
      await this.gaugeController.vote(gaugeAddress)
      this.canVote = false
    } catch (error) {
      this.alert.showErrorAlert(error)
    }
  }

  async rebalance() {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      await this.showLoading('Rebalancing in progress')
      await this.gaugeController.rebalance(this.wallet.currentAccount)
    } catch (error) {
      this.hideLoading()
      this.alert.showErrorAlert(error)
    }
  }

  async claim(pool) {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      const vaultContract = this.vaultService.contractAt(pool.address)
      const gaugeAddress = await this.vaultService.gauge(vaultContract)
      const gaugeContract = this.liquidityGauge.contractAt(gaugeAddress)
      await this.liquidityGauge.claim(gaugeContract)
      this.showLoading('Claiming rewards')
    } catch (error) {
      this.hideLoading()
      this.alert.showErrorAlert(error)
    }
  }

  async registerForEvents() {
    this.voteEventSubscription = this.gaugeController.votedSubject.subscribe(async res => {
      console.log('votes recieved: ', res)
      if (res && res.account && this.wallet.currentAccount && 
        this.wallet.currentAccount.toLowerCase() == res.account.toLowerCase()) {}
        await this.loadGaugeData()
    })
    this.rebalanceEventSubscription = this.gaugeController.rebalanceSubject.subscribe(async res => {
      console.log('votes recieved: ', res)
      await this.loadGaugeData()
      await this.hideLoading()
    })
    this.cheddaTransferSubscription = this.chedda.transferSubject.subscribe(async res => {
      if (res && res.to.toLowerCase() === this.wallet.currentAccount.toLowerCase()) {
        await this.hideLoading()
        await this.alert.showToast('CHEDDA transfer received')
        await this.loadGaugeData()
      }
    })
    this.netWorkChangeSubscription = this.environmentService.environmentSubject.subscribe(async network => {
      if(network){
        this.currency = this.environmentService.environment.config.networkParams.nativeCurrency.symbol
        this.vaultContract = this.vaultService.contractAt(this.environmentService.environment.config.contracts.CheddaBaseTokenVault)
        this.lendingPools = this.environmentService.environment.config.pools
        await this.loadVeChedda()
        await this.loadGaugeData()
      }
    })
  }

  private async showLoading(message: string) {
    this.loader = await this.modalController.create({
      component: LoadingModalComponent,
      componentProps:{
        'message': message
      }
    })
    return await this.loader?.present()
  }

  private async hideLoading() {
    await this.loader?.dismiss()
  }

}
