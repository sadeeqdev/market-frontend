import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CheddaDappStoreService } from './contracts/chedda-dapp-store.service';
import { DefaultProviderService } from './providers/default-provider.service';
import { WalletProviderService } from './providers/wallet-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  // constructor() {}

  prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  connected = false
  isDark = false;
  account: string

  constructor(
    private provider: WalletProviderService, 
    private dappStore: CheddaDappStoreService,
    private alertController: AlertController
    ) {}

  // toggleDarkTheme(prefersDark.matches);

  // // Listen for changes to the prefers-color-scheme media query
  // prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

  async ngOnInit() {
    this.setupListeners()
    let isConnected = await this.provider.isConected()
    console.log('onInit, isConnected = ', isConnected)
    if (isConnected) {
      this.provider.getAccounts()
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
    console.log('about to connect');
    // let signer = await this.provider.openMetamask()
    // console.log('signer = ', signer)
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
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Go To Metamask',
        handler: () => {
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
      this.account = account
    })
    this.provider.networkSubject.subscribe(network => {
      console.log('App component got network: ', network)
    })
  }
}
