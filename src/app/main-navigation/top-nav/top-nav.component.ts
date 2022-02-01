import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CheddaRewardsService } from 'src/app/contracts/chedda-rewards.service';
import { CheddaXpService } from 'src/app/contracts/chedda-xp.service';
import { ProfilePopoverComponent } from 'src/app/profile/components/profile-popover/profile-popover.component';
import { Profile } from 'src/app/profile/profile.interface';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { PreferencesService } from 'src/app/shared/preferences.service';
import { NetworksPopoverComponent } from '../networks-popover/networks-popover.component';
import { environment } from 'src/environments/environment';

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
  balance = 0
  isCorrectNetwork = true
  env = environment
  popover: any
  profile: Profile
  title = 'Dapps'

  imageDataUrl = ''
  private accountSubscription?: Subscription
  private networkSubscription?: Subscription
  private balanceSubscription?: Subscription

  menuItems = [
    {
      name: 'Market',
      path: '/nfts',
      icon: 'bag',
    }, 
    {
      name: 'Launches',
      path: '/drops',
      icon: 'gift'
    },
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
    // {
    //   name: 'Dapps',
    //   path: '/dapps',
    //   icon: 'apps',
    // },
    // {
    //   name: 'Rewards',
    //   path: '/rewards',
    //   icon: 'trophy',
    // },

  ]

  constructor(
    private router: Router,
    private zone: NgZone,
    private provider: WalletProviderService, 
    private cheddaXP: CheddaXpService,
    private alertService: GlobalAlertService,
    private popoverController: PopoverController,
    private preferences: PreferencesService,
    private rewardService: CheddaRewardsService, // not used locally needed to listen to global rewards events
    ) {
    }


  async ngOnInit() {
    const colorTheme = this.preferences.colorTheme
    this.toggleDarkTheme(colorTheme == 'dark')

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
    this.accountSubscription = this.provider.accountSubject.subscribe(account => {
      this.zone.run(async () => {
        this.account = account
        if (account) {
          this.balance = await (await this.cheddaXP.balanceOf(account)).toNumber()
        }
        this.createBlockie()
      })
    })
    this.networkSubscription = this.provider.networkSubject.subscribe(chainId => {
      if (chainId) {
        this.zone.run(() => {
          this.isCorrectNetwork = chainId.toString(16).toLowerCase() == this.provider.currentNetwork.chainId.toLocaleLowerCase()
          console.log(`Networks: ${chainId} <=> ${this.provider.currentNetwork.chainId}`)
        })
      }
    })
    this.balanceSubscription = this.cheddaXP.balanceSubject.subscribe(balance => {
      if (balance) {
        this.balance = balance
      }
    })
  }

  async checkRoute() {
    let url = this.router.url
    switch (url) {
      case url.match(/\/dapps/)?.input:
        this.title = 'Dapps'
        break
      case url.match(/\/nft/)?.input:
        this.title = 'NFT Market'
        break
      case url.match(/\/rewards/)?.input:
        this.title = 'Rewards'
        break
      case url.match('/\/drops/')?.input:
        this.title = 'Drops'
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
}
