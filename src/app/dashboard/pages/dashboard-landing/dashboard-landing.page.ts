import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType, ChartOptions } from 'chart.js';
import { BigNumber, ethers } from 'ethers';
import { CheddaBaseTokenVaultService } from 'src/app/contracts/chedda-base-token-vault.service';
import { CheddaService } from 'src/app/contracts/chedda.service';
import { PriceConsumerService } from 'src/app/contracts/price-consumer.service';
import { StakedCheddaService } from 'src/app/contracts/staked-chedda.service';
import { environment } from 'src/environments/environment';

export interface TVLStats {
  total: number
  deposits: number
  collateral: number
}

export interface StakingStats {
  totalSupply: string
  staked:string
  baseAPR: string
}

@Component({
  selector: 'app-dashboard-landing',
  templateUrl: './dashboard-landing.page.html',
  styleUrls: ['./dashboard-landing.page.scss'],
})
export class DashboardLandingPage implements OnInit {

 // Staking
 public stakingChartLabels: string[] = [ 'Staked', 'Unstaked', ]
 public stakingChartColors = [
  {backgroundColor:["#9E120E","#FF5800","#FFB414"]},
];
 public stakingChartData: ChartData<'doughnut'>

 // TVL
 public tvlChartLabels: string[] = [ 'Deposits', 'Collateral', ]
 public tvlChartColors = [
  {backgroundColor:["#9E120E","#FF5800","#FFB414"]},
];
 public tvlChartData: ChartData<'doughnut'> 

 public stakingChartType: ChartType = 'doughnut';
 public stakingStats: StakingStats
 public tvlStats: TVLStats
 public vaultContract

  constructor(
    private cheddaService: CheddaService,
    private sCheddaService: StakedCheddaService,
    private vaultService: CheddaBaseTokenVaultService,
    private priceConsumer: PriceConsumerService,
  ) { }

  async ngOnInit() {
    this.vaultContract = this.vaultService.contractAt(environment.config.contracts.CheddaBaseTokenVault)
    await this.loadTVLStats()
    await this.loadCheddaStats()
  }

  async loadTVLStats() {
    const deposits = await this.vaultService.totalAssets(this.vaultContract)
    try {
      
      const collateralAmounts = await this.vaultService.collateralAmounts(this.vaultContract)
      const depositTotal = +ethers.utils.formatEther(deposits)
      const collateralValue = await this.calculateCollateralTotal(collateralAmounts)
      // const collateralTotal = ethers.utils.formatEther(collateralAmounts)
      this.tvlChartData = {
        labels: this.tvlChartLabels,
        datasets: [
          { data: [ depositTotal, collateralValue,],
          },
        ]
      }
      this.tvlStats = {
        total: depositTotal + collateralValue,
        deposits: depositTotal,
        collateral: collateralValue,
      }

    } catch (error) {
      console.error('caught error: ', error)
    }
  }

  async loadCheddaStats() {
    const totalSupply = await this.cheddaService.totalSupply()
    const stakedTotal = await this.sCheddaService.totalAssets()
    const baseApr = await this.cheddaService.apr()
    this.stakingStats = {
      totalSupply: ethers.utils.formatEther(totalSupply),
      staked: ethers.utils.formatEther(stakedTotal),
      baseAPR: (baseApr.toNumber()/1000).toString()
    }
    const totalUnstaked = totalSupply.sub(stakedTotal)

    this.stakingChartData = {
      labels: this.stakingChartLabels,
      datasets: [
        { data: [ 
          +ethers.utils.formatEther(totalSupply),
          +ethers.utils.formatEther(totalUnstaked),],
        },
      ]
    }
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  nameFormatting(name: string): string {
    if (name.toLocaleLowerCase() == 'total') {
      return 'Total Supply'
    }
    return name
  }

  async calculateCollateralTotal(collateralAmounts): Promise<number> {
    const usdRate = await this.priceConsumer.latestPriceUSD()
    let totalPrice = 0
    for (let i = 0; i < collateralAmounts.length; i++) {
      const c = collateralAmounts[i];
      const amount: BigNumber = c.amount
      const value = +(this.priceConsumer.toUSD(ethers.utils.formatEther(amount), usdRate, 2))
      totalPrice += value
    }
    return totalPrice
  }
}
