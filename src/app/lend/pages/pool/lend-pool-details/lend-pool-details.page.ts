import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput, LoadingController, NavController } from '@ionic/angular';
import { BigNumber, ethers } from 'ethers';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CheddaBaseTokenVaultService } from 'src/app/contracts/chedda-base-token-vault.service';
import { TokenService } from 'src/app/contracts/token.service';
import { LendingPool } from 'src/app/lend/lend.models';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { environment } from 'src/environments/environment';

export interface VaultStats {
  borrowApr: number
  depositApr: number
  rewardsApr: number
  liquidity: BigNumber
  utilization: BigNumber
}
@Component({
  selector: 'app-lend-pool-details',
  templateUrl: './lend-pool-details.page.html',
  styleUrls: ['./lend-pool-details.page.scss'],
})
export class LendPoolDetailsPage implements OnInit, OnDestroy {

  @ViewChild('depositInput') depositInput: IonInput
  @ViewChild('withdrawInput') withdrawInput: IonInput
  isApproved = false
  currentSegment = 'deposit'
  usdc
  vaultContract
  stats?: VaultStats
  usdcApprovalSubject = new BehaviorSubject(null)
  approvalEventListener
  depositEventListener
  withdrawEventListener
  walletSubscription?: Subscription
  myUsdcBalance
  myVaultSharesBalance = '0'
  totalVaultAssets = '0'
  loader?

  utilizationRate = 0
  depositApy = 0
  rewardsApy = 0
  ratePrecision = 100000
  routeSubscription: Subscription
  pool: LendingPool

  constructor(
    private tokenService: TokenService, 
    private vaultService: CheddaBaseTokenVaultService,
    private wallet: WalletProviderService,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private navController: NavController,
    private alert: GlobalAlertService) { }

  async ngOnInit() {
    await this.setup()
    this.usdc = this.tokenService.contractAt(environment.config.contracts.USDC)
  }

  ngOnDestroy(): void {
    this.walletSubscription?.unsubscribe()
  }

  private async setup() {
    this.routeSubscription = this.route.paramMap.subscribe(async paramMap => {
      if (!paramMap.has('id')) {
        this.navigateBack()
        return
      }
      const poolId = paramMap.get('id')
      this.pool = this.findPoolWithId(poolId)
      if (!this.pool) {
        console.warn('pool id not found')
        this.navigateBack()
        return
      }
      this.vaultContract = this.vaultService.contractAt(poolId)
      console.log('vaultcontract = ', this.vaultContract)
      if (!this.vaultContract) { 
        this.navigateBack()
        return
      }

      await this.loadVaultStats()
      await this.checkAllowance()
      this.registerEventListeners()
    })
  }

  private findPoolWithId(id: string): LendingPool | null {
    for (const pool of environment.config.pools) {
      if (pool.address.toLowerCase() == id.toLocaleLowerCase()) {
        return pool
      }
    }
    return null
  }
  
  onSegmentChanged($event) {
    this.currentSegment = $event.target.value
  }

  private async loadVaultStats() {
    const stats = await this.vaultService.getVaultStats(this.vaultContract)
    console.log('stats = ', stats)
    this.depositApy = stats.depositApr/this.ratePrecision
    this.utilizationRate = stats.utilization.toNumber()/this.ratePrecision
    this.rewardsApy = stats.rewardsApr/this.ratePrecision
    this.totalVaultAssets = ethers.utils.formatEther(stats.liquidity)
    if (!this.wallet || !this.wallet.currentAccount) {
      return
    }
    this.myUsdcBalance = ethers.utils.formatEther(await this.tokenService.balanceOf(this.usdc, this.wallet.currentAccount))

    this.myVaultSharesBalance = ethers.utils.formatEther(
      await this.tokenService.balanceOf(this.vaultContract, this.wallet.currentAccount))
    
  }

  async approveUsdc() {
    console.log('usdc address = ', this.usdc.address)
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      this.showLoading('Waiting for approval')
      const totalSupply = await this.tokenService.totalSupply(this.usdc)
      await this.tokenService.approve(this.usdc, this.vaultContract.address, totalSupply)
    } catch (error) {
      this.alert.showErrorAlert(error)
      this.hideLoading()
    }
  }

  async deposit() {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      await this.showLoading('Waiting for confirmation')
      const amount = ethers.utils.parseUnits(this.depositInput.value.toString() ?? '0')
      this.depositInput.value = ''
      await this.vaultService.depositAsset(this.vaultContract, amount, this.wallet.currentAccount) 
    } catch (error) {
      await this.hideLoading()
      this.alert.showErrorAlert(error)
    }
  }

  async redeem() {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      await this.showLoading('Waiting for confirmation')
      const amount = ethers.utils.parseUnits(this.withdrawInput.value.toString() ?? '0')
      this.withdrawInput.value = ''
      this.vaultService.redeem(this.vaultContract, amount, this.wallet.currentAccount) 
    } catch (error) {
      await this.hideLoading()
      this.alert.showErrorAlert(error)
    }
  }  

  fillMaxDeposit() {
    this.depositInput.value = this.myUsdcBalance
  }

  fillMaxWithdraw() {
    this.withdrawInput.value = this.myVaultSharesBalance
  }

  private async registerEventListeners() {
    this.usdcApprovalSubject = this.usdc.on('Approval', async (account, spender, amount) => {
      console.log('Approval: ', account, spender, amount)
      if (account.toLowerCase() === this.wallet.currentAccount.toLowerCase()) {
        this.hideLoading()
        this.isApproved = true
      }
    })

    this.depositEventListener = this.vaultContract.on('Deposit', async (from, to, amount, shares) => {
      console.log('deposit posted: ', from, to, amount, shares)
      if (from.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        this.hideLoading()
        this.alert.showToast('Deposit confirmed')
        await this.loadVaultStats()
      }
    })
    this.withdrawEventListener = this.vaultContract.on('Withdraw', async (from, to, amount, shares) => {
      if (from.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        this.hideLoading()
        this.alert.showToast('Withdrawal confirmed')
        await this.loadVaultStats()
      }
    })

    this.wallet.accountSubject.subscribe(wallet => {
      this.loadVaultStats()
    })
  }

  private async checkAllowance() {
    if (!this.wallet || !this.wallet.currentAccount) {
      return
    }
    const allowance = await this.tokenService.allowance(this.usdc, this.wallet.currentAccount, this.vaultContract.address)
    this.isApproved = allowance.gt(ethers.utils.parseUnits("1000"))
  }

  private async showLoading(message: string) {
    this.loader = await this.loadingController.create({
      message
    })
    await this.loader?.present()
  }

  private async hideLoading() {
    await this.loader?.dismiss()
  }

  private navigateBack() {
    this.navController.navigateBack('/lend')
  }
}
