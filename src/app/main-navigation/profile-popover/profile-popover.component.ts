import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CheddaService } from 'src/app/contracts/chedda.service';
import { VeCheddaService } from 'src/app/contracts/ve-chedda.service';
import { Profile } from 'src/app/profile/profile.interface';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { ethers } from 'ethers';

declare const blockies
@Component({
  selector: 'app-nav-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class NavProfilePopoverComponent implements OnInit {
  isOpenProfileMenu: boolean;
  account?: string
  connected = false
  isDark = false;
  balance
  veBalance
  isCorrectNetwork = true
  isConnected = false
  popover: any
  profile: Profile
  title = 'Dapps'
  isMenuOpen: boolean = false
  imageDataUrl = ''
  private accountSubscription?: Subscription;
  private networkSubscription?: Subscription;
  private balanceSubscription?: Subscription;

  constructor(
    private wallet: WalletProviderService,
    private router: Router,
    private provider: WalletProviderService, 
    private chedda: CheddaService,
    private veChedda: VeCheddaService,
    private alertService: GlobalAlertService,
  ) { 

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
        this.balance = ethers.utils.formatEther(await this.chedda.balanceOf(account))
        this.veBalance = ethers.utils.formatEther(await this.veChedda.balanceOf(account))
      }
      this.createBlockie()
    })

    this.networkSubscription = this.provider.networkSubject.subscribe(async chainId => {
      if (chainId) {
          this.isCorrectNetwork = chainId.toString(16).toLowerCase() == this.provider.currentNetwork.chainId.toLocaleLowerCase()
          console.log(`Networks: ${chainId} <=> ${this.provider.currentNetwork.chainId}`)
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

  async switchNetwork() {
    await this.provider.addNetwork()
  }

  openProfileMenu(){
    this.isOpenProfileMenu = !this.isOpenProfileMenu
  }

  async navigateToProfile() {
    this.setTitle('Profile')
    this.router.navigate(['/', 'profile', this.account])
  }

  async disconnect() {
    await this.wallet.disconnect()
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.profile-menu-container')) {
      this.isOpenProfileMenu = false;
    }
  }
}
