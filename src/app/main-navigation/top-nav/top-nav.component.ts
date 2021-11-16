import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { CheddaDappStoreService } from 'src/app/contracts/chedda-dapp-store.service';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';

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

  constructor(
    private provider: WalletProviderService, 
    private dappStore: CheddaDappStoreService,
    private alertController: AlertController,
    private zone: NgZone,
    private popoverController: PopoverController,
    ) {}


  async ngOnInit() {
    this.setupListeners()
    let isConnected = await this.provider.isConected()
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
      // document.body.setAttribute('prefers-color-scheme', 'dark');

      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
      // document.body.setAttribute('prefers-color-scheme', 'light');
    }
    this.isDappStore()
  }

  async onConnectTapped() {
    let isConected = await this.provider.isConected()
    if (isConected) {
      this.provider.getAccounts()
    } else {
      this.presentNoConnectionAlert()
    }
  }

  async presentNoConnectionAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'No Connection',
      // subHeader: 'Subtitle',
      message: 'No Web3 wallet was detected. To continue please install Metamask or another Web3 compatible wallet.',
      buttons: [ {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Canceled');
        }
      }, {
        text: 'Go To Metamask',
        handler: () => {
          window.open('https://metamask.io/', '_blank').focus()
          console.log('Confirm Okay');
        }
      }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async isDappStore() {
    console.log('is isCheddaStore = ', await this.dappStore.isCheddaStore());
  }

  async setupListeners() {
    this.provider.accountSubject.subscribe(account => {
      console.log('>>> top nav got account: ', account);
      
      this.account = account
    })
    this.provider.networkSubject.subscribe(chainId => {
      this.zone.run(() => {
        console.log('Got network: ', chainId)
        this.isCorrectNetwork = chainId == this.provider.currentNetwork.chainId
        console.log('**** isCorrectNetwork = ', this.isCorrectNetwork)
        console.log(`${chainId} <=> ${this.provider.currentNetwork.chainId}`)
      })

    })
  }

  async switchNetwork() {
    await this.provider.addNetwork()
  }
}
