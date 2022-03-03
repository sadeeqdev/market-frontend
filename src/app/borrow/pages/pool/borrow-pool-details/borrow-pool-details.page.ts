import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, LoadingController } from '@ionic/angular';
import { ethers } from 'ethers';
import { CheddaBaseTokenVaultService } from 'src/app/contracts/chedda-base-token-vault.service';
import { TokenService } from 'src/app/contracts/token.service';
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
  collateralTokeName
  collateralTokenSymbol
  loader
  myCollateralTokenBalance
  myCollateralDeposited
  collaterals = [
  ]
  selectedNfts = []
  myNftsCollateral = []
  utilizationRate = 0
  depositApy = 0
  rewardsApy = 0
  ratePrecision = 100000
  totalVaultAssets
  assetSymbol

  collateralApprovalListener
  depositListener
  borrowListener
  repayListener
  borrowMode: BorrowMode = BorrowMode.collateral
  repayMode: RepayMode

  constructor(
    private tokenService: TokenService, 
    private vaultService: CheddaBaseTokenVaultService,
    private wallet: WalletProviderService,
    private loadingController: LoadingController,
    private alert: GlobalAlertService) { 

  }

  async ngOnInit() {
    this.assetSymbol = environment.config.pools[0].asset.symbol
    this.collateralContract = this.tokenService.contractAt(environment.config.contracts.WrappedNative)
    console.log('collateralContract = ', this.collateralContract)
    this.vaultContract = this.vaultService.contractAt(environment.config.contracts.CheddaBaseTokenVault)

    this.collaterals = environment.config.pools[0].collateral
    this.collateralTokeName = environment.config.pools[0].collateral[0].name
    this.collateralTokenSymbol = environment.config.pools[0].collateral[0].symbol
    await this.registerForEvents()
    await this.checkAllowance()
  }

  onSegmentChanged($event) {
    this.currentSegment = $event.target.value
  }

  onCollateralTypeChanged($event) {
    const newValue = $event.target.value
    if (newValue == this.collateralTokenSymbol) {
      this.collateralType = newValue
    } else {
      this.alert.showToast('Support for NFTs coming soon')   
    }
  }

  private async loadVaultStats() {
    const stats = await this.vaultService.getVaultStats(this.vaultContract)
    console.log('stats = ', stats)
    this.depositApy = stats.depositApr/this.ratePrecision
    this.utilizationRate = stats.utilization.toNumber()/this.ratePrecision
    this.rewardsApy = stats.rewardsApr/this.ratePrecision
    this.totalVaultAssets = ethers.utils.formatEther(stats.liquidity)
    console.log('collateral address =', this.collateralContract.address)
    if (this.wallet && this.wallet.currentAccount) {
      const balance = await this.tokenService.balanceOf(this.collateralContract, this.wallet.currentAccount)
      console.log('balance = ', balance)
      const deposits =  await this.vaultService.collateral(this.vaultContract, this.wallet.currentAccount, this.collateralContract.address)
      console.log('deposits: ', deposits)

      this.myCollateralTokenBalance = ethers.utils.formatEther(
        await this.tokenService.balanceOf(this.collateralContract, this.wallet.currentAccount)
      )
      this.myCollateralDeposited = ethers.utils.formatEther(
        (await this.vaultService.collateral(
          this.vaultContract, this.wallet.currentAccount, this.collateralContract.address)).amount
      )
      const collateral = await this.vaultService.collateral(
        this.vaultContract, 
        this.wallet.currentAccount, 
        this.collateralContract.address
        ) 
      console.log('collateral = ', collateral)
      this.myCollateral = ethers.utils.parseEther(collateral.amount.toString())
      console.log('mycollateral = ', this.myCollateral)
    }

  }

  fillMaxDeposit() {
    this.addCollateralInput.value = this.myCollateralTokenBalance
  }

  fillMaxBorrow() {

  }

  fillMaxWithdraw() {
    this.withdrawCollateralInput.value = this.myCollateralDeposited
  }

  fillMaxRepay() {

  }

  async approveCollateral() {
    console.log('usdc address = ', this.collateralContract.address)
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

  private async registerForEvents() {
    this.collateralApprovalListener = this.collateralContract.on('Approval', async (account, spender, amount) => {
      console.log('Approval: ', account, spender, amount)
      if (account.toLowerCase() === this.wallet.currentAccount.toLowerCase()) {
        this.hideLoading()
        this.isApproved = true
      }
    })

    this.depositListener = this.vaultContract.on('OnCollateralAdded', async (from, to, amount, shares) => {
      console.log('deposit posted: ', from, to, amount, shares)
      if (from.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        this.hideLoading()
        this.alert.showToast('Deposit confirmed')
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
}
