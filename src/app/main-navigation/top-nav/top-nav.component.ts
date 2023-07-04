import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/profile/profile.interface';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { EnvironmentProviderService } from 'src/app/providers/environment-provider.service';import { CheddaService } from 'src/app/contracts/chedda.service';
import { ethers } from 'ethers';
import { StakedCheddaService } from 'src/app/contracts/staked-chedda.service';

declare const blockies

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit, OnDestroy {

  @ViewChild('networkBtn', { read: ElementRef }) networkBtn: ElementRef
  prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  connected = false
  isDark = false;
  account?: string
  cheddaBalance
  xCheddaBalance
  isCorrectNetwork = true
  isConnected = false
  env 
  popover: any
  profile: Profile
  title = 'Dapps'
  isMobileNavOpen: boolean = false
  imageDataUrl = ''
  private accountSubscription?: Subscription
  private networkSubscription?: Subscription
  private balanceSubscription?: Subscription
  private changeNetworkSubscription?: Subscription

  menuItems = [
    // {
    //   name: 'Dashboard',
    //   path: '/dashboard',
    //   icon: 'pie-chart',
    // }, 
    {
      name: 'Lend',
      path: '/lend',
      icon: 'briefcase'
    },
    {
      name: 'Borrow',
      path: '/borrow',
      icon: 'cash'
    },
    {
      name: 'Grotto',
      path: '/grotto',
      icon: 'storefront'
    },
    {
      name: 'Vote',
      path: '/vote',
      icon: 'checkbox',
    }, 
  ]

  constructor(
    private router: Router,
    private provider: WalletProviderService, 
    private chedda: CheddaService,
    private xChedda: StakedCheddaService,
    private wallet: WalletProviderService,
    private alertService: GlobalAlertService,
    private popoverController: PopoverController,
    private environmentService: EnvironmentProviderService
    ) {
      this.env = this.environmentService.environment
      // Initialize Metamask provider
      let eth:any = window.ethereum;
  
      // Watch for provider disconnection
      if(eth){
        eth.on('accountsChanged', (accounts: any) => {
          if (accounts.length > 0) {
            this.account = accounts[0]
          }else{
            // Metamask provider is disconnected
            this.account = ''
          }
        });
      }
    }

  async ngOnInit() {
    this.setupListeners()
    this.checkRoute()
    let isConnected = await this.provider.connect()
    console.log('onInit, isConnected = ', isConnected)
    if (isConnected) {
      try {
        // this.provider.getAccounts()
      } catch (error) {
        console.warn('failed to get accounts: ', error)
      }
    }
  }

  ngOnDestroy(): void {
      this.accountSubscription?.unsubscribe()
      this.networkSubscription?.unsubscribe()
      this.balanceSubscription?.unsubscribe()
  }

  async onConnectTapped() {
    let isConected = await this.provider.connect()
    if (isConected) {
      this.provider.getAccounts()
    } else {
      this.alertService.presentNoConnectionAlert()
    }
  }

  async setupListeners() {
    this.accountSubscription = this.provider.accountSubject.subscribe(async account => {
      this.account = account
      if (account) {
        this.cheddaBalance = ethers.utils.formatEther(await this.chedda.balanceOf(account))
        this.xCheddaBalance = ethers.utils.formatEther(await this.xChedda.balanceOf(account))
      }
      this.createBlockie()
    })

    this.networkSubscription = this.provider.networkSubject.subscribe(async chainId => {
      if (chainId) {
          this.isCorrectNetwork = chainId.toString(16).toLowerCase() == this.provider.currentNetwork.chainId.toLocaleLowerCase()
          console.log(`Networks: ${chainId} <=> ${this.provider.currentNetwork.chainId}`)
      }
    })

    this.changeNetworkSubscription = this.environmentService.environmentSubject.subscribe(async network => {
      if(network){
        this.isCorrectNetwork = network.config.networkParams.chainId.toLocaleLowerCase() == this.provider.currentNetwork.chainId.toLocaleLowerCase()
        this.env = network
      }
    })
  }

  async checkRoute() {
    let url = this.router.url
    switch (url) {
      case url.match(/\/dashboard/)?.input:
        this.title = 'Dashboard'
        break
      case url.match(/\/lend/)?.input:
        this.title = 'Lend'
        break
      case url.match(/\/borrow/)?.input:
        this.title = 'Borrow'
        break
      case url.match('/\/grotto/')?.input:
        this.title = 'Grotto'
        break
      case url.match('/\/vote/')?.input:
        this.title = 'Vote'
        break
      case url.match(/\/profile/)?.input:
        this.title = 'Profile'
        break
    }
  }

  async switchNetwork() {
    await this.provider.addNetwork()
  }

  setTitle(title) {
    this.title = title
  }

  private createBlockie() {
    var blockie = blockies.create({
      seed: this.account,
      size: 8,
      scale: 2
    })
    this.imageDataUrl = blockie.toDataURL()
  }

  async navigateToProfile() {
    this.setTitle('Profile')
    this.router.navigate(['/', 'profile', this.account])
  }

  async disconnect() {
    await this.wallet.disconnect()
  }

  onNetworkSelected(network: any) {
    this.popoverController.dismiss()
    window.open(network.url, '_self').focus()
  }

  closeMobileNav(){
    this.isMobileNavOpen = false;
  }

  openMobileNav(){
    this.isMobileNavOpen = true;
  }
}

  
