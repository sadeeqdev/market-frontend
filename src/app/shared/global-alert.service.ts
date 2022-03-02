import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { WalletProviderService } from '../providers/wallet-provider.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalAlertService {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private provider: WalletProviderService,
    private router: Router,
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

  async showMessageAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Okay',
          role: 'okay',
          cssClass: 'primary',
        }
      ]
    });

    await alert.present();
  }

  async showErrorAlert(error: Error) {
    const anyError = (error as any)
    const alert = await this.alertController.create({
      header: 'An Error Occured',
      message: (anyError.data && anyError.data.message)? anyError.data.message : anyError.message,
      buttons: [
        {
          text: 'Okay',
          role: 'okay',
          cssClass: 'primary',
        }
      ]
    });

    await alert.present(); 
  }

  async showNoCheddaXPAlert() {
    const alert = await this.alertController.create({
      header: 'No Chedda XP',
      message: 'Your Chedda XP balance less than the required amount to proceed.\nEarn Chedda XP in the Dappstore and NFT Market by participating.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Earn Chedda XP',
          handler: () => {
            this.router.navigate(['/', 'dapps'])
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
            const faucets = environment.config.faucets
            if (faucets.length > 0) {
              const url = faucets[0].url
              window.open(url, '_blank').focus()
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async approveNFT() {
    const alert = await this.alertController.create({
      header: 'Approve NFT',
      message: 'To use this NFT as collateral, you must approve Chedda Protocol to manage this NFT. No tokens are transferred until you accept a loan offer.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Approve',
          handler: () => {
            return true
          }
        }
      ]
    });

    await alert.present();
    return alert
  }

  async showPurchaseConfirmationAlert(txHash: string) {
    const alert = await this.alertController.create({
      header: 'Transaction sent',
      message: 'Your purchased NFT will show up in your owned items once the transaction is confirmed.',
      buttons: [
        {
          text: 'Okay',
          role: 'okay',
        }, {
          text: 'View transaction',
          handler: () => {
            window.open(environment.config.ui.txUrlPrefix + txHash, '_blank').focus
          }
        }
      ]
    });

    await alert.present(); 
  }

  async showOkayAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Okay',
          role: 'okay',
        }
      ]
    });

    await alert.present(); 
  }

  async showRewardConfirmationAlert(amount) {
    const alert = await this.alertController.create({
      header: 'Reward!',
      message: `Thanks for rating. 
      Your reward of ${amount} Chedda XP will be posted to your account once the transaction confirms on the blockchain.`,
      buttons: [
        {
          text: 'Okay',
          role: 'okay',
        }
      ]
    });

    await alert.present(); 
  }
  
  async showRewardReceivedToast(amount) {
    const toast =  await this.toastController.create({
      header: 'Chedda XP earned',
      message: `You just earned ${amount} XP`,
      position: 'bottom',
      duration: 3000
    })

    await toast.present()
  }

  async showToast(message: string, timeout: number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: timeout
    })
    await toast.present()
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
