import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonButton, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CheddaDappStoreService } from 'src/app/contracts/chedda-dapp-store.service';
import { ProfilePopoverComponent } from 'src/app/profile/components/profile-popover/profile-popover.component';
import { Profile } from 'src/app/profile/profile.interface';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { NetworksPopoverComponent } from '../networks-popover/networks-popover.component';

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
  isCorrectNetwork = true
  popover: any
  profile: Profile
  title = 'Dapps'
  dropdown = false
  private accountSubscription?: Subscription
  private networkSubscription?: Subscription

  menuItems = [
    {
      name: 'Dapps',
      path: '/dapps',
      icon: 'apps',
    },
    {
      name: 'NFT Market',
      path: '/nfts',
      icon: 'bag',
    }, 
    {
      name: 'Rewards',
      path: '/rewards',
      icon: 'trophy',
    },
  ]

  constructor(
    private provider: WalletProviderService, 
    private router: Router,
    private zone: NgZone,
    private alertService: GlobalAlertService,
    private popoverController: PopoverController,
    ) {}


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
  }

  // Add or remove the "dark" class based on if the media query matches
  toggleDarkTheme(shouldAdd: boolean) {
    this.isDark = !this.isDark;
    if (shouldAdd) {
      document.body.setAttribute('color-theme', 'dark');
      document.body.setAttribute('prefers-color-scheme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
      document.body.setAttribute('prefers-color-scheme', 'light');
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
      this.zone.run(() => {
        this.account = account
      })
    })
    this.networkSubscription = this.provider.networkSubject.subscribe(chainId => {
      if (chainId) {
        this.zone.run(() => {
          this.isCorrectNetwork = chainId.toString(16) == this.provider.currentNetwork.chainId
          console.log(`Networks: ${chainId} <=> ${this.provider.currentNetwork.chainId}`)
        })
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

  hideDropdown(event) {
    const xTouch = event.clientX;
    const yTouch = event.clientY;

    const rect = this.networkBtn.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top+2;
    const leftBoundary = rect.left+2;
    const rightBoundary = rect.right-2;

    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.dropdown = false;
    }
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

  async navigateToProfile() {
    this.setTitle('Profile')
    this.router.navigate(['/', 'profile', this.account])
  }
}
