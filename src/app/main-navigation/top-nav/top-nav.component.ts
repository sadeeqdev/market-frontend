import { Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ProfilePopoverComponent } from 'src/app/profile/components/profile-popover/profile-popover.component';
import { Profile } from 'src/app/profile/profile.interface';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { PreferencesService } from 'src/app/shared/preferences.service';
import { NetworksPopoverComponent } from '../networks-popover/networks-popover.component';
import { environment } from 'src/environments/environment';
import { CheddaService } from 'src/app/contracts/chedda.service';
import { VeCheddaService } from 'src/app/contracts/ve-chedda.service';
import { ethers } from 'ethers';

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
  balance
  veBalance
  isCorrectNetwork = true
  isConnected = false
  env = environment
  popover: any
  profile: Profile
  title = 'Dapps'
  isMenuOpen: boolean = false
  imageDataUrl = ''
  private accountSubscription?: Subscription
  private networkSubscription?: Subscription
  private balanceSubscription?: Subscription
  isScrolled: boolean = false;
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

  networkList = [
    // {
    //   name: 'Avalanche Testnet',
    //   url: 'https://testnet-avalanche.chedda.store',
    //   icon: '/assets/logos/avalanche-avax-logo.png'
    // },
    // {
    //   name: 'Harmony Testnet',
    //   url: 'https://testnet-harmony.chedda.store',
    //   icon: '/assets/logos/harmony-logo.png'
    // },
    {
      name: 'Oasis',
      url: 'https://testnet-oasis.chedda.store',
      icon: '/assets/logos/Oasis-logo.svg'
    },
    {
      name: 'Polygon',
      url: 'https://testnet-polygon.chedda.store',
      icon: '/assets/logos/polygon-logo.svg'
    },
    // {
    //   name: 'Telos Testnet',
    //   url: 'https://telos-hackathon.chedda.store',
    //   icon: '/assets/logos/tlos-logo.png'
    // },
  ]
  isOpenProfileMenu: boolean = false;
  isOpenNetworkMenu: boolean = false;

  constructor(
    private router: Router,
    private zone: NgZone,
    private provider: WalletProviderService, 
    private chedda: CheddaService,
    private veChedda: VeCheddaService,
    private wallet: WalletProviderService,
    private alertService: GlobalAlertService,
    private popoverController: PopoverController,
    private preferences: PreferencesService,
    ) {
    }


  async ngOnInit() {
    const colorTheme = this.preferences.colorTheme

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

  // Add or remove the "dark" class based on if the media query matches
  toggleDarkTheme(shouldAdd: boolean) {
    this.isDark = shouldAdd
    if (shouldAdd) {
      document.body.setAttribute('color-theme', 'dark');
      document.body.setAttribute('prefers-color-scheme', 'dark');
      this.preferences.colorTheme = 'dark'
    } else {
      document.body.setAttribute('color-theme', 'light');
      document.body.setAttribute('prefers-color-scheme', 'light');
      this.preferences.colorTheme = 'light'
    }
    document.body.classList.toggle('dark', shouldAdd)
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

  async switchNetwork() {
    await this.provider.addNetwork()
  }

  setTitle(title) {
    this.title = title
  }

  
  async presentProfilePopover(event: any) {
    this.popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      componentProps: {address: this.account},
      event: event,
      translucent: true
    })
    await this.popover.present()
  }

  async presentNetworksPopver(event: any) {
    const popover = await this.popoverController.create({
      component: NetworksPopoverComponent,
      event: event,
      translucent: true
    })
    await popover.present()
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

  openProfileMenu(){
    this.isOpenProfileMenu = !this.isOpenProfileMenu
  }

  openNetworkMenu(){
    this.isOpenNetworkMenu = !this.isOpenNetworkMenu
  }

  onNetworkSelected(network: any) {
    this.popoverController.dismiss()
    window.open(network.url, '_self').focus()
  }

  closeMenu(){
    this.isMenuOpen = false;
  }

  openMenu(){
    this.isMenuOpen = true;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.network-menu-container')) {
      this.isOpenNetworkMenu = false;
    }

    if (!(event.target as HTMLElement).closest('.profile-menu-container')) {
      this.isOpenProfileMenu = false;
    }
  }
}

  
