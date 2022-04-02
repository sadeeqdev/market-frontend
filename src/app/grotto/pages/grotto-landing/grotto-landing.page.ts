import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonInput, LoadingController } from '@ionic/angular';
import { BigNumber, ethers } from 'ethers';
import { Subscription } from 'rxjs';
import { CheddaService } from 'src/app/contracts/chedda.service';
import { FaucetService } from 'src/app/contracts/faucet.service';
import { StakedCheddaService } from 'src/app/contracts/staked-chedda.service';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { environment } from 'src/environments/environment';

interface Token {
  name: string
  logo: string
  address: string
}

@Component({
  selector: 'app-grotto-landing',
  templateUrl: './grotto-landing.page.html',
  styleUrls: ['./grotto-landing.page.scss'],
})
export class GrottoLandingPage implements OnInit, OnDestroy {

  @ViewChild('stakeInput') stakeInput: IonInput
  @ViewChild('unstakeInput') unstakeInput: IonInput
  cheddaTotalSupply
  myCheddaBalance = '0'
  myStakedCheddaBalance = '0'
  cheddaStakingAPR
  currentSegment = 'stake'
  loader?
  isApproved = false
  cheddaApprovalSubscription?: Subscription
  cheddaTransferSubscription?: Subscription
  depositSubscription?: Subscription
  withdrawSubscription?: Subscription

  tokens: Token[] = [
    {
      name: 'CHEDDA',
      logo: '/assets/logos/chedda-logo-square.png',
      address: environment.config.contracts.Chedda
    },
    {
      name: 'USDC.c',
      logo: '/assets/logos/usd-coin-logo.png',
      address: environment.config.contracts.USDC
    },
    {
      name: environment.config.pools[0].collateral[0].symbol,
      logo: environment.config.pools[0].collateral[0].logo,
      address: environment.config.pools[0].collateral[0].address
    }
  ]
  constructor(
    private faucet: FaucetService,
    private wallet: WalletProviderService,
    private chedda: CheddaService,
    private xChedda: StakedCheddaService,
    private alert: GlobalAlertService,
    private loadingController: LoadingController) { }


  async ngOnInit() {
    await this.loadCheddaStats()
    await this.checkAllowance()
    await this.listenForEvents()
  }

  ngOnDestroy(): void {
    this.cheddaApprovalSubscription?.unsubscribe()
    this.cheddaTransferSubscription?.unsubscribe()
    this.depositSubscription?.unsubscribe()
    this.withdrawSubscription?.unsubscribe()
  }

  async loadCheddaStats() {
    try {
      this.cheddaTotalSupply = ethers.utils.formatEther(await this.chedda.totalSupply())
      this.cheddaStakingAPR = ((await this.chedda.apr()).toNumber()/1000).toString()
      console.log('apr = ', this.cheddaStakingAPR)
      if (this.wallet.isConnected && this.wallet.currentAccount) {
        this.myCheddaBalance = ethers.utils.formatEther(await this.chedda.balanceOf(this.wallet.currentAccount))
        this.myStakedCheddaBalance = ethers.utils.formatEther(await this.xChedda.balanceOf(this.wallet.currentAccount))
      } else {
        this.myCheddaBalance = '0'
        this.myStakedCheddaBalance = '0'
      }
    } catch (error) {
      this.alert.showErrorAlert(error) 
    }
  }

  async addTokenToMetamask(token) {
    try {
      await this.wallet.addToken(token.address, token.name, 18)
    } catch (error) {
      this.alert.showErrorAlert(error)
    }
  }

  async drip(token: string) {
    if (!this.wallet.isConnected) {
      this.alert.showConnectAlert()
      return
    }
    let accountBalance = await this.wallet.checkBalance()
    if (accountBalance.eq(BigNumber.from(0))) {
      this.alert.showInsufficientBalanceAlert()
      return
    }
    try {
      await this.faucet.drip(token)
      await this.alert.showToast('Drip request sent to faucet')
    } catch (error) {
      await this.hideLoading()
      await this.alert.showErrorAlert(error)
    }
  }

  async stake() {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    const amount = ethers.utils.parseEther(this.stakeInput.value.toString() ?? '0')
    const cheddaBalance = ethers.utils.parseEther(this.myCheddaBalance)
    if (amount.gt(cheddaBalance)){
      this.alert.showMessageAlert('Can not stake', 'Insufficient CHEDDA balance')
      return
    }
    try {
      await this.showLoading('Waiting for confirmation')
      await this.xChedda.stake(amount)
      this.stakeInput.value = ''
    } catch (error) {
      await this.hideLoading()
      this.alert.showErrorAlert(error)
    }
  }

  async unstake() {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    const amount = ethers.utils.parseEther(this.unstakeInput.value.toString() ?? '0')
    const stakedBalance = ethers.utils.parseEther(this.myStakedCheddaBalance)
    if (amount.gt(stakedBalance)){
      this.alert.showMessageAlert('Can not unstake', 'Insufficient sCHEDDA balance')
      return
    }
    try {
      this.showLoading('Waiting for confirmation')
      await this.xChedda.unstake(amount)
      this.unstakeInput.value = ''
    } catch (error) {
      this.alert.showErrorAlert(error)
    }
  }

  async approveChedda() {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      await this.showLoading('Waiting for approval')
      await this.chedda.approve(this.xChedda.address())
    } catch (error) {
      await this.hideLoading()
      await this.alert.showErrorAlert(error)
    }
  }

  async approveStakedChedda() {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      this.chedda.approve(this.xChedda.address())
    } catch (error) {
      await this.alert.showErrorAlert(error)
    }
  } 
  onSegmentChanged($event) {
    this.currentSegment = $event.target.value
  }

  fillMaxStake() {
    this.stakeInput.value = this.myCheddaBalance
  }

  fillMaxUnstake() {
    this.unstakeInput.value = this.myStakedCheddaBalance
  }

  private async showLoading(message: string) {
    this.loader = await this.loadingController.create({
      message
    })
    await this.loader?.present()
  }

  private async hideLoading() {
    console.log('hiding loader')
    await this.loader?.dismiss()
  }

  private async checkAllowance() {
    if (!this.wallet || !this.wallet.currentAccount) {
      return
    }
    const allowance = await this.chedda.allowance(this.wallet.currentAccount, this.xChedda.address())
    this.isApproved = allowance.gt(ethers.utils.parseUnits("1000"))
  }

  private async listenForEvents() {
    this.cheddaApprovalSubscription = this.chedda.approvalSubject.subscribe(async res => {
      if (res && res.account && res.account.toLowerCase() === this.wallet.currentAccount.toLowerCase()) {
        this.isApproved = true
        await this.hideLoading()
      }
    })

    this.cheddaTransferSubscription = this.chedda.transferSubject.subscribe(async res => {
      if (res && res.to.toLowerCase() === this.wallet.currentAccount.toLowerCase()) {
        await this.hideLoading()
        await this.alert.showToast('CHEDDA transfer received')
        await this.loadCheddaStats()
      }
    })

    this.depositSubscription = this.xChedda.depositSubject.subscribe(async res => {
      console.log('deposit received: ', res)
      if (this.wallet && this.wallet.currentAccount && res && res.from.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        await this.hideLoading()
        await this.alert.showToast('Stake confirmed')
        await this.loadCheddaStats()
      }
    })

    this.withdrawSubscription = this.xChedda.withdrawSubject.subscribe(async res => {
      console.log('withdraw received: ', res)
      if (this.wallet && this.wallet.currentAccount && res && res.from.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        await this.hideLoading()
        await this.alert.showToast('Withdrawal confirmed')
        await this.loadCheddaStats()
      }
    })
  }
}

