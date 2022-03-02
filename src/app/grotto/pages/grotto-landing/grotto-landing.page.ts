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
  myCheddaBalance
  myStakedCheddaBalance
  cheddaStakingAPR
  currentSegment = 'stake'
  loader
  isApproved = false
  cheddaApprovalSubscription?: Subscription
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
      name: 'WAVAX.c',
      logo: '/assets/logos/avalanche-avax-logo.png',
      address: environment.config.contracts.WrappedNative
    }
  ]
  constructor(
    private faucet: FaucetService,
    private wallet: WalletProviderService,
    private chedda: CheddaService,
    private sChedda: StakedCheddaService,
    private alert: GlobalAlertService,
    private loadingController: LoadingController) { }


  async ngOnInit() {
    await this.loadCheddaStats()
    await this.checkAllowance()
    await this.listenForEvents()
  }

  ngOnDestroy(): void {
    this.cheddaApprovalSubscription?.unsubscribe()
    this.depositSubscription?.unsubscribe()
    this.withdrawSubscription?.unsubscribe()
  }

  async loadCheddaStats() {
    try {
      this.cheddaTotalSupply = ethers.utils.formatEther(await this.chedda.totalSupply())
      this.cheddaStakingAPR = ((await this.chedda.apr()).toNumber()/1000).toString()
      console.log('apr = ', this.cheddaStakingAPR)
      if (this.wallet.isConnected) {
        this.myCheddaBalance = ethers.utils.formatEther(await this.chedda.balanceOf(this.wallet.currentAccount))
        this.myStakedCheddaBalance = ethers.utils.formatEther(await this.sChedda.balanceOf(this.wallet.currentAccount))
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
    } catch (error) {
      await this.alert.showErrorAlert(error)
    }
  }

  async stake() {
    const amount = ethers.utils.parseEther(this.stakeInput.value.toString() ?? '0')
    const cheddaBalance = ethers.utils.parseEther(this.myCheddaBalance)
    if (amount.gt(cheddaBalance)){
      this.alert.showMessageAlert('Can not stake', 'Insufficient CHEDDA balance')
      return
    }
    try {
      await this.showLoading('Waiting for confirmation')
      await this.sChedda.stake(amount)
      this.stakeInput.value = ''
    } catch (error) {
      await this.hideLoading()
      this.alert.showErrorAlert(error)
    }
  }

  async unstake() {
    const amount = ethers.utils.parseEther(this.unstakeInput.value.toString() ?? '0')
    const stakedBalance = ethers.utils.parseEther(this.myStakedCheddaBalance)
    if (amount.gt(stakedBalance)){
      this.alert.showMessageAlert('Can not unstake', 'Insufficient sCHEDDA balance')
      return
    }
    try {
      this.showLoading('Waiting for confirmation')
      await this.sChedda.unstake(amount)
      this.unstakeInput.value = ''
    } catch (error) {
      this.alert.showErrorAlert(error)
    }
  }

  async approveChedda() {
    try {
      await this.showLoading('Waiting for approval')
      await this.chedda.approve(this.sChedda.address())
    } catch (error) {
      await this.hideLoading()
      await this.alert.showErrorAlert(error)
    }
  }

  async approveStakedChedda() {
    try {
      this.chedda.approve(this.sChedda.address())
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
    await this.loader.present()
  }

  private async hideLoading() {
    console.log('hiding loader')
    await this.loader.dismiss()
  }

  private async checkAllowance() {
    if (!this.wallet || !this.wallet.currentAccount) {
      return
    }
    const allowance = await this.chedda.allowance(this.wallet.currentAccount, this.sChedda.address())
    this.isApproved = allowance.gt(ethers.utils.parseUnits("1000"))
  }

  private async listenForEvents() {
    this.cheddaApprovalSubscription = this.chedda.approvalSubject.subscribe(async res => {
      if (res && res.account.toLowerCase() === this.wallet.currentAccount.toLowerCase()) {
        this.isApproved = true
        await this.hideLoading()
      }
    })

    this.depositSubscription = this.sChedda.depositSubject.subscribe(async res => {
      console.log('deposit received: ', res)
      if (this.wallet && this.wallet.currentAccount && res && res.from.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        await this.hideLoading()
        await this.alert.showToast('Stake confirmed')
        await this.loadCheddaStats()
      }
    })

    this.withdrawSubscription = this.sChedda.withdrawSubject.subscribe(async res => {
      console.log('withdraw received: ', res)
      if (this.wallet && this.wallet.currentAccount && res && res.from.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        await this.hideLoading()
        await this.alert.showToast('Withdrawal confirmed')
        await this.loadCheddaStats()
      }
    })
  }
}

