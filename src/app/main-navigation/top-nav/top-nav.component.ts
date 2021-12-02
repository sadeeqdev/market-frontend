import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { CheddaDappStoreService } from 'src/app/contracts/chedda-dapp-store.service';
import { ProfilePopoverComponent } from 'src/app/profile/components/profile-popover/profile-popover.component';
import { Profile } from 'src/app/profile/profile.interface';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {

  prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  connected = false
  isDark = false;
  account?: string
  isCorrectNetwork = true
  popover: any
  profile: Profile

  constructor(
    private provider: WalletProviderService, 
    private zone: NgZone,
    private alertService: GlobalAlertService,
    private popoverController: PopoverController,
    ) {}


  async ngOnInit() {
    this.setupListeners()
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
    this.provider.accountSubject.subscribe(account => {
      this.zone.run(() => {
        this.account = account
      })
    })
    this.provider.networkSubject.subscribe(chainId => {
      if (chainId) {
        this.zone.run(() => {
          this.isCorrectNetwork = chainId.toString(16) == this.provider.currentNetwork.chainId
          console.log(`Networks: ${chainId} <=> ${this.provider.currentNetwork.chainId}`)
        })
      }
    })
  }

  async switchNetwork() {
    await this.provider.addNetwork()
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
}
