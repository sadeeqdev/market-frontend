import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { WalletProviderService } from '../providers/wallet-provider.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalAlertService {

  constructor(
    private alertController: AlertController,
    private provider: WalletProviderService,
    ) { }

  async presentNoConnectionAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'No Connection',
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
    })
    alert.present()

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async showConnectAlert() {
    const alert = await this.alertController.create({
      header: 'Connect!',
      message: 'Please connect your wallet to proceed.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Connect',
          handler: () => {
            console.log('Confirm Okay')
            this.connect()
          }
        }
      ]
    });

    await alert.present();
  }

  async showInsufficientBalanceAlert() {
    const alert = await this.alertController.create({
      header: 'Insufficient Balance',
      message: 'The balance in your account is less than the required amount to proceed.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Get More Tokens',
          handler: () => {
            window.open('https://faucet.polygon.technology/', '_blank').focus()
          }
        }
      ]
    });

    await alert.present();
  }

  async connect() {
    let isConected = await this.provider.connect()
    console.log('connect clicked with result: ', isConected)
    if (isConected) {
      this.provider.getAccounts()
    } else {
      this.presentNoConnectionAlert()
    }
  }

}
