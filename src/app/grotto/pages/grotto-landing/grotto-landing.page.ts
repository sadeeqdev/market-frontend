import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BigNumber, ethers } from 'ethers';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { CheddaService } from 'src/app/contracts/chedda.service';
import { FaucetService } from 'src/app/contracts/faucet.service';
import { StakedCheddaService } from 'src/app/contracts/staked-chedda.service';
import { VeCheddaService } from 'src/app/contracts/ve-chedda.service';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { LoadingModalComponent } from 'src/app/shared/components/loading-modal/loading-modal.component';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { EnvironmentProviderService } from 'src/app/providers/environment-provider.service';
import { ButtonService } from 'src/app/shared/button.service';
interface Token {
  name: string
  logo: string
  address: string
  isNFT?: boolean
}

@Component({
  selector: 'app-grotto-landing',
  templateUrl: './grotto-landing.page.html',
  styleUrls: ['./grotto-landing.page.scss'],
})
export class GrottoLandingPage implements OnInit, OnDestroy {

  @ViewChild('stakeInput') stakeInput: ElementRef
  @ViewChild('unstakeInput') unstakeInput: ElementRef
  @ViewChild('lockInput') lockInput: ElementRef
  @ViewChild('unlockInput') unlockInput: ElementRef
  @ViewChild('lockRange')lockRange: ElementRef
  cheddaTotalSupply
  myCheddaBalance = '0'
  myStakedCheddaBalance = '0'
  myVeCheddaBalance = '0'
  myXCheddaLocked = '0'
  cheddaStakingAPR
  loader?
  isCheddaApproved = false
  isXCheddaApproved = false
  cheddaApprovalSubscription?: Subscription
  xCheddaApprovalSubscription?: Subscription
  cheddaTransferSubscription?: Subscription
  xCheddaDepositSubscription?: Subscription
  veCheddaDepositSubscription?: Subscription
  withdrawSubscription?: Subscription
  lockExpiry: string
  isStakeTab: boolean = true;
  isLockCheddaTab: boolean = true
  lockRangeValue: any = 1
  environment: any = []
  tokens: Token[]; 
  netWorkChangeSubscription: Subscription;

  constructor(
    private faucet: FaucetService,
    private wallet: WalletProviderService,
    private chedda: CheddaService,
    private xChedda: StakedCheddaService,
    private veChedda: VeCheddaService,
    private alert: GlobalAlertService,
    private modalController: ModalController,
    private environmentService: EnvironmentProviderService,
    private buttonService: ButtonService,

    ) {

      // Checks if acount is changed or disconnected
      // Updates chedda balance according to account selected 
    this.environment = this.environmentService.environment
    let eth:any = window.ethereum

    if(eth){
      eth.on('accountsChanged', (accounts: any) => {
        this.loadCheddaStats()
        this.loadVeCheddaStats()
      });
    }

    this.tokens = [
      {
        name: 'CHEDDA',
        logo: '/assets/logos/chedda-3d-logo.png',
        address: this.environment.config.contracts.Chedda
      },
      {
        name: 'USDC.c',
        logo: '/assets/logos/usdc-logo.png',
        address: this.environment.config.contracts.USDC
      },
      {
        name: 'DAI.c',
        logo: '/assets/logos/dai-logo.png',
        address: this.environment.config.contracts.DAI
      },
      {
        name: 'FRAX',
        logo: '/assets/logos/frax-logo.png',
        address: this.environment.config.contracts.UXD
      },
      {
        name: this.environment.config.pools[0].collateral[0].symbol,
        logo: this.environment.config.pools[0].collateral[0].logo,
        address: this.environment.config.pools[0].collateral[0].address
      },
      {
        name: 'WGK',
        logo: '/assets/logos/wgk-logo.png',
        address: this.environment.config.contracts.NFT,
        isNFT: true 
      }
    ]
  }


  async ngOnInit() {
    await this.loadCheddaStats()
    await this.loadVeCheddaStats()
    await this.checkAllowance()
    await this.listenForEvents()
    this.environment = this.environmentService.environment
  }

  ngOnDestroy(): void {
    this.cheddaApprovalSubscription?.unsubscribe()
    this.xCheddaApprovalSubscription?.unsubscribe()
    this.cheddaTransferSubscription?.unsubscribe()
    this.xCheddaDepositSubscription?.unsubscribe()
    this.withdrawSubscription?.unsubscribe()
    this.netWorkChangeSubscription?.unsubscribe()
  }

  async loadCheddaStats() {
    try {
      this.cheddaTotalSupply = ethers.utils.formatEther(await this.chedda.totalSupply())
      this.cheddaStakingAPR = (ethers.utils.formatEther(await this.chedda.apr())).toString()
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

  async loadVeCheddaStats() {
    try {
      if (this.wallet.isConnected && this.wallet.currentAccount) {
        this.myVeCheddaBalance = ethers.utils.formatEther(await this.veChedda.balanceOf(this.wallet.currentAccount))
        this.myXCheddaLocked = ethers.utils.formatEther(await this.veChedda.lockedAmount(this.wallet.currentAccount))
        const lockExpiry = (await this.veChedda.lockedEnd(this.wallet.currentAccount)).mul(1000).toString()
        console.log(lockExpiry)
        this.lockExpiry = lockExpiry
      } else {
        this.myVeCheddaBalance = '0'
        this.myXCheddaLocked = '0'
      }
    } catch (error) {
      this.alert.showErrorAlert(error) 
    }
  }

  async handleAddTokenClicked(token){
    this.buttonService.handleTransactionButton(async() => {
      await this.addTokenToMetamask(token)
    });
  }

  async handleDripClicked(token){
    this.buttonService.handleTransactionButton(async() => {
      await this.drip(token)
    });
  }

  async addTokenToMetamask(token) {
    try {
      await this.wallet.addToken(token.address, token.name, 18)
    } catch (error) {
      this.alert.showErrorAlert(error)
    }
  }

  async drip(token: Token) {
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
      // if isNFT, mint
      let tx:any
      if (token.isNFT) {
        tx = await this.faucet.mint(token.address)
      } else {
        tx = await this.faucet.drip(token.address)
      }
      this.alert.showConfirmationModal(tx.hash)
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
    const amount = ethers.utils.parseEther(this.stakeInput.nativeElement.value.toString() ?? '0')
    const cheddaBalance = ethers.utils.parseEther(this.myCheddaBalance)
    console.log('amount to stake: ', amount)
    if (amount.gt(cheddaBalance)){
      this.alert.showMessageAlert('Can not stake', 'Insufficient CHEDDA balance')
      return
    }
    try {
      await this.showLoading('Waiting for Confirmation')
      await this.xChedda.stake(amount)
      this.stakeInput.nativeElement.value = ''
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
    const amount = ethers.utils.parseEther(this.unstakeInput.nativeElement.value.toString() ?? '0')
    const stakedBalance = ethers.utils.parseEther(this.myStakedCheddaBalance)
    if (amount.gt(stakedBalance)){
      this.alert.showMessageAlert('Can not unstake', 'Insufficient sCHEDDA balance')
      return
    }
    try {
      this.showLoading('Waiting for Confirmation')
      await this.xChedda.unstake(amount)
      this.unstakeInput.nativeElement.value = ''
    } catch (error) {
      this.alert.showErrorAlert(error)
    }
  }

  async lock() {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      const lockInputValue = this.lockInput.nativeElement.value
      if (!lockInputValue) {
        this.alert.showToast('Invalid lock time')
        return
      }
      const amount = ethers.utils.parseEther(lockInputValue.toString())
      const weeks = this.lockRange.nativeElement.value.toString()
      const unlockTime = moment().add(weeks, 'weeks').unix()
      console.log('unlock time = ', unlockTime)
      console.log('amount = ', amount)
      await this.veChedda.createLock(amount, BigNumber.from(unlockTime))
    } catch (error) {
      this.alert.showErrorAlert(error)
    }

  }

  async withdraw() {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      await this.veChedda.withdraw()
    } catch (error) {
      this.alert.showErrorAlert(error)
    }
  }

  switchStakeTab(isStakeTab:boolean) {
    this.isStakeTab = isStakeTab;
  }

  switchLockCheddaTab(isLockTab:boolean){
    this.isLockCheddaTab = isLockTab
  }

  async approveChedda() {
    if (!this.wallet.currentAccount) {
      this.alert.showConnectAlert()
      return
    }
    try {
      await this.showLoading('Waiting for Approval')
      await this.chedda.approve(this.xChedda.address())
    } catch (error) {
      this.isCheddaApproved = false
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
      await this.showLoading('Waiting for Approval')
      await this.xChedda.approve(this.veChedda.address())
    } catch (error) {
      this.isXCheddaApproved = false
      this.hideLoading()
      await this.alert.showErrorAlert(error)
    }
  } 

  fillMaxStake() {
    this.stakeInput.nativeElement.value = this.myCheddaBalance
  }

  fillMaxUnstake() {
    this.unstakeInput.nativeElement.value = this.myStakedCheddaBalance
  }

  fillMaxLock() {
    this.lockInput.nativeElement.value = this.myStakedCheddaBalance
  }

  fillMaxUnlock() {
    this.unlockInput.nativeElement.value = ''
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
    console.log('hiding loader')
    await this.loader?.dismiss()
  }

  private async checkAllowance() {
    if (!this.wallet || !this.wallet.currentAccount) {
      return
    }
    const allowance = await this.chedda.allowance(this.wallet.currentAccount, this.xChedda.address())
    this.isCheddaApproved = allowance.gt(ethers.utils.parseUnits("1000"))
  }

  showConfirmationModal(event) {
    if (event) {
      const txHash = event.transactionHash;
      this.alert.showConfirmationModal(txHash);
    }
  }

  private async listenForEvents() {
    this.cheddaApprovalSubscription = this.chedda.approvalSubject.subscribe(async res => {
      if (res && res.account && res.account.toLowerCase() === this.wallet.currentAccount.toLowerCase()) {
        this.isCheddaApproved = true
        console.log(res)
        await this.hideLoading()
        console.log(res)
      }
    })

    this.xCheddaApprovalSubscription = this.xChedda.approvalSubject.subscribe(async res => {
      if (res && res.account && res.account.toLowerCase() === this.wallet.currentAccount.toLowerCase()) {
        this.isXCheddaApproved = true
        await this.hideLoading()
      }
    })

    this.cheddaTransferSubscription = this.chedda.transferSubject.subscribe(async res => {
      if (res && res.to.toLowerCase() === this.wallet.currentAccount.toLowerCase()) {
        await this.hideLoading()
        this.showConfirmationModal(res.event)
        await this.loadCheddaStats()
      }
    })

    this.xCheddaDepositSubscription = this.xChedda.depositSubject.subscribe(async res => {
      console.log('deposit received: ', res)
      if (this.wallet && this.wallet.currentAccount && res && res.from.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        await this.hideLoading()
        this.showConfirmationModal(res.event)
        await this.loadCheddaStats()
      }
    })

    this.veCheddaDepositSubscription = this.veChedda.depositSubject.subscribe(async res => {
      console.log('deposit received: ', res)
      if (this.wallet && this.wallet.currentAccount && res && res.address.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        await this.hideLoading()
        this.showConfirmationModal(res.event)
        await this.loadVeCheddaStats()
      }
    }) 

    this.withdrawSubscription = this.xChedda.withdrawSubject.subscribe(async res => {
      console.log('withdraw received: ', res)
      if (this.wallet && this.wallet.currentAccount && res && res.from.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        await this.hideLoading();
        this.showConfirmationModal(res.event)
        await this.loadCheddaStats();
      }
    })

    this.netWorkChangeSubscription = this.environmentService.environmentSubject.subscribe(async network => {
      if(network){
        await this.loadCheddaStats();
        await this.loadVeCheddaStats();
        await this.checkAllowance();
        return;
      }
    })
  }
}

