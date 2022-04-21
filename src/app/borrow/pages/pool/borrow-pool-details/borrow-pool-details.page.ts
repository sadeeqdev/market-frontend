import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInput, LoadingController, NavController } from '@ionic/angular';
import { BigNumber, ethers } from 'ethers';
import { Subscription } from 'rxjs';
import { CheddaBaseTokenVaultService } from 'src/app/contracts/chedda-base-token-vault.service';
import { CheddaDebtTokenService } from 'src/app/contracts/chedda-debt-token.service';
import { TokenService } from 'src/app/contracts/token.service';
import { LendingPool } from 'src/app/lend/lend.models';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { environment } from 'src/environments/environment';

enum BorrowMode {
  borrow ='borrow',
  collateral = 'collateral'
}

enum RepayMode {
  repay = 'repay',
  collateral = 'collateral'
}

@Component({
  selector: 'app-borrow-pool-details',
  templateUrl: './borrow-pool-details.page.html',
  styleUrls: ['./borrow-pool-details.page.scss'],
})
export class BorrowPoolDetailsPage implements OnInit {

  @ViewChild('addCollateralInput') addCollateralInput: IonInput
  @ViewChild('borrowInput') borrowInput: IonInput
  @ViewChild('withdrawCollateralInput') withdrawCollateralInput: IonInput
  @ViewChild('repayInput') repayInput: IonInput
  
  currentSegment = 'borrow'
  isApproved = false
  myCollateral
  collateralType = ''
  collateralContract
  vaultContract
  debtContract
  collateralTokeName
  collateralTokenSymbol
  loader
  myCollateralTokenBalance
  myCollateralDeposited = '0'
  myAmountOwed = '0'
  collaterals = [
  ]
  selectedNfts = []
  myNftsCollateral = []
  utilizationRate = '0'
  depositApy = '0'
  rewardsApy = '0'
  totalVaultAssets
  assetSymbol
  maxBorrowAmount // TODO: update maxLTV to 75% and use remaining borrow amount instead of total borrow 
  maxLTV = 65 // 65 % 

  collateralApprovalListener
  depositListener
  borrowListener
  repayListener
  withdrawListener
  borrowMode: BorrowMode = BorrowMode.collateral
  repayMode: RepayMode = RepayMode.repay
  routeSubscription: Subscription
  pool: LendingPool

  constructor(
    private tokenService: TokenService, 
    private vaultService: CheddaBaseTokenVaultService,
    private debtService: CheddaDebtTokenService,
    private wallet: WalletProviderService,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private navController: NavController,
    private alert: GlobalAlertService) { 

  }

  async ngOnInit() {
    await this.setup();
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
        console.warn('pool with id not found: ', poolId)
        this.navigateBack()
        return
      }

      this.assetSymbol = this.pool.asset.symbol
      this.collaterals = this.pool.collateral
      this.collateralTokeName = this.pool.collateral[0].name
      this.collateralTokenSymbol = this.pool.collateral[0].symbol
      this.vaultContract = this.vaultService.contractAt(poolId)
      this.collateralContract = this.tokenService.contractAt(this.pool.collateral[0].address)
      this.debtContract = this.debtService.contractAt(await this.vaultContract.debtToken())
      if (!this.vaultContract) { 
        this.navigateBack()
        return
      }

      await this.loadVaultStats()
      await this.checkAllowance()
      this.registerForEvents()
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

  onCollateralTypeChanged($event) {
    const newValue = $event.target.value
    this.changeCollateral(newValue)
  }

  private async changeCollateral(symbol: string) {
    let found = false
    for (const c of this.pool.collateral) {
      if (c.symbol === symbol) {
        this.collateralContract = this.tokenService.contractAt(c.address)
        found = true
        break
      }
    }
    if (found) {
      this.collateralTokenSymbol = symbol
      await this.updateCollateralBalances()
      await this.registerCollateralEvents()
      await this.checkAllowance()
    } else {
      this.alert.showToast('Invalid collateral')
    }
 
  }

  private async updateCollateralBalances() {
    if (!(this.wallet && this.wallet.currentAccount)) {
      return
    }
    this.myCollateralTokenBalance = ethers.utils.formatEther(
      await this.tokenService.balanceOf(this.collateralContract, this.wallet.currentAccount)
    )
    this.myCollateralDeposited = ethers.utils.formatEther(
      (await this.vaultService.collateral(
        this.vaultContract, this.wallet.currentAccount, this.collateralContract.address)).amount
    )
  }

  private async loadVaultStats() {
    const stats = await this.vaultService.getVaultStats(this.vaultContract)
    console.log('stats = ', stats)
    this.utilizationRate = ethers.utils.formatEther(stats.utilization.mul(100))
    this.depositApy = ethers.utils.formatEther(stats.depositApr.mul(1000)) // todo: Should be .mul(100)
    this.rewardsApy = ethers.utils.formatEther(stats.rewardsApr.mul(100))
    this.totalVaultAssets = ethers.utils.formatEther(stats.liquidity)
    if (this.wallet && this.wallet.currentAccount) {
      await this.updateCollateralBalances()
      const collateralValue = await this.vaultService.totalAccountCollateralValue(
        this.vaultContract, 
        this.wallet.currentAccount
      )
      const maxLoanAmount = collateralValue.mul(this.maxLTV).div(100)
      const collateral = await this.vaultService.collateral(
        this.vaultContract, 
        this.wallet.currentAccount, 
        this.collateralContract.address
        )
      const borrowed = await this.debtService.debtOf(this.debtContract, this.wallet.currentAccount)
      this.myAmountOwed = ethers.utils.formatEther(borrowed)
      this.maxBorrowAmount = ethers.utils.formatEther(maxLoanAmount.sub(borrowed))
      this.myCollateral = ethers.utils.parseEther(collateral.amount.toString())
    }
  }

  fillMaxDeposit() {
    this.setBorrowMode(BorrowMode.collateral)
    this.addCollateralInput.value = this.myCollateralTokenBalance
  }

  fillMaxBorrow() {
    this.setBorrowMode(BorrowMode.borrow)
    this.borrowInput.value = this.maxBorrowAmount
  }

  fillMaxWithdraw() {
    this.setRepayMode(RepayMode.collateral)
    this.withdrawCollateralInput.value = this.myCollateralDeposited
  }

  fillMaxRepay() {
    this.setRepayMode(RepayMode.repay)
    this.repayInput.value = this.myAmountOwed
  }

  async approveCollateral() {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      this.showLoading('Waiting for approval')
      const totalSupply = await this.tokenService.totalSupply(this.collateralContract)
      await this.tokenService.approve(this.collateralContract, this.vaultContract.address, totalSupply)
    } catch (error) {
      this.alert.showErrorAlert(error)
      this.hideLoading()
    }
  }

  async addCollateral() {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      await this.showLoading('Waiting for confirmation')
      const amount = ethers.utils.parseUnits(this.addCollateralInput.value.toString() ?? '0')
      this.addCollateralInput.value = ''
      await this.vaultService.addCollateral(this.vaultContract, this.collateralContract.address, amount)    
    } catch (error) {
      this.hideLoading()
      this.alert.showErrorAlert(error)
    }
  }

  async removeCollateral() {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      await this.showLoading('Waiting for confirmation')
      const amount = ethers.utils.parseUnits(this.withdrawCollateralInput.value.toString() ?? '0')
      this.withdrawCollateralInput.value = ''
      await this.vaultService.removeCollateral(this.vaultContract, this.collateralContract.address, amount)
    } catch (error) {
      this.hideLoading()
      this.alert.showErrorAlert(error)
    }
  }

  async borrowAsset() {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      await this.showLoading('Waiting for confirmation')
      const amount = ethers.utils.parseUnits(this.borrowInput.value.toString() ?? '0')
      this.borrowInput.value = ''
      await this.vaultService.borrow(this.vaultContract, amount)
    } catch (error) {
      this.hideLoading()
      this.alert.showErrorAlert(error)
    }
  }

  async repay() {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      await this.showLoading('Waiting for confirmation')
      const amount = ethers.utils.parseUnits(this.repayInput.value.toString() ?? '0')
      this.repayInput.value = ''
      await this.vaultService.repay(this.vaultContract, amount) 
    } catch (error) {
      this.hideLoading()
      this.alert.showErrorAlert(error)
    }
  }

  setBorrowMode(mode) {
    this.borrowMode = mode
    if (mode == BorrowMode.borrow) {
      this.addCollateralInput.value = ''
    } else {
      this.borrowInput.value = ''
    }
  }

  setRepayMode(mode) {
    this.repayMode = mode
    if (mode == RepayMode.repay) {
      this.withdrawCollateralInput.value = ''
    } else {
      this.repayInput.value = ''
    }
  }

  private async checkAllowance() {
    if (!this.wallet || !this.wallet.currentAccount) {
      return
    }
    const allowance = await this.tokenService.allowance(this.collateralContract, this.wallet.currentAccount, this.vaultContract.address)
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

  private async registerCollateralEvents() {
    this.collateralContract.off('Approval')
    this.collateralApprovalListener = this.collateralContract.on('Approval', async (account, spender, amount) => {
      console.log('Approval: ', account, spender, amount)
      if (account.toLowerCase() === this.wallet.currentAccount.toLowerCase()) {
        this.hideLoading()
        this.isApproved = true
      }
    })
  }

  private async registerForEvents() {

    await this.registerCollateralEvents()
    this.depositListener = this.vaultContract.on('OnCollateralAdded', async (token, by, amount, shares) => {
      console.log('deposit posted: ', token, by, amount, shares)
      if (by.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        this.hideLoading()
        this.alert.showToast('Deposit confirmed')
        await this.loadVaultStats()
      }
    })
    
    this.withdrawListener = this.vaultContract.on('OnCollateralRemoved', async (token, address, type, amount) => {
      console.log('withdrawn posted: ', token, address, type, amount)
      if (address.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        this.hideLoading()
        this.alert.showToast('Withdrawal confirmed')
        await this.loadVaultStats()
      }
    })

    this.borrowListener = this.vaultContract.on('OnLoanOpened', async (from, to, amount, shares) => {
      if (from.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        this.hideLoading()
        this.alert.showToast('Borrow confirmed')
        await this.loadVaultStats()
      }
    })
    this.repayListener = this.vaultContract.on('OnLoanRepaid', async (from, to, amount, shares) => {
      if (from.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        this.hideLoading()
        this.alert.showToast('Repayment confirmed')
        await this.loadVaultStats()
      }
    })

    this.wallet.accountSubject.subscribe(() => {
      this.loadVaultStats()
    })
  }

  private navigateBack() {
    this.navController.navigateBack('/borrow')
  }
}
