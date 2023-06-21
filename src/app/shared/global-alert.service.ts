import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { WalletProviderService } from '../providers/wallet-provider.service';
import { environment } from 'src/environments/environment';
import { ActionModalComponent } from './components/action-modal/action-modal.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { time } from 'console';

@Injectable({
  providedIn: 'root'
})
export class GlobalAlertService {

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private provider: WalletProviderService,
    private router: Router,
    ) { }

  async presentNoConnectionAlert() {
    const alert = await this.modalController.create({
      component: ActionModalComponent,
      componentProps:{
        'heading': 'No Connection',
        'message': 'No Web3 wallet was detected. To continue please install Metamask or another Web3 compatible wallet.',
        'actionText': 'Go To Metamask',
        'modalAction': () => {
          window.open('https://metamask.io/', '_blank').focus()
          console.log('Confirm Okay');
        } ,
        'cancelAction': async () => {
          await alert.dismiss();
        }   
      }
    })
    alert.present()

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async showConnectAlert() {
    const alert = await this.modalController.create({
      component: ActionModalComponent,
      componentProps:{
        'heading': 'Connect!',
        'message': 'Please connect your wallet to proceed.',
        'actionText': 'Go To Metamask',
        'modalAction': async () => {
          console.log('Confirm Okay')
          this.connect()
          await alert.dismiss();
        },
        'cancelAction': async () => {
          await alert.dismiss();
        }   
      }
    })
   
    await alert.present();
  }

  async showMessageAlert(title: string, message: string) {
    
    const alert = await this.modalController.create({
      component: ActionModalComponent,
      componentProps:{
        'heading': title,
        'message': message,
        'cancelAction': async () => {
          await alert.dismiss();
        }  
      }
    })

    await alert.present();
  }

  async showErrorAlert(error: Error) {
    const anyError = (error as any)
    const alert = await this.modalController.create({
      component: ActionModalComponent,
      componentProps:{
        'heading': 'An Error Occured!',
        'message': (anyError.data && anyError.data.message)? anyError.data.message : anyError.message,
        'cancelAction': async () => {
          await alert.dismiss();
        }  
      }
    })

    await alert.present(); 
  }

  async showNoCheddaXPAlert() {
    const alert = await this.modalController.create({
      component: ActionModalComponent,
      componentProps:{
        'heading': 'No Chedda XP',
        'message': 'Your Chedda XP balance less than the required amount to proceed.\nEarn Chedda XP in the Dappstore and NFT Market by participating.',
        'actionText': 'Earn Chedda XP',
        'modalAction': () => {
          this.router.navigate(['/', 'dapps'])
        },
        'cancelAction': async () => {
          await alert.dismiss();
        }   
      }
    })

    await alert.present();
  }

  async showInsufficientBalanceAlert() {
    const alert = await this.modalController.create({
      component: ActionModalComponent,
      componentProps:{
        'heading': 'Insufficient Balance',
        'message': 'The balance in your account is less than the required amount to proceed.',
        'actionText': 'Get More Tokens',
        'modalAction': () => {
          const faucets = environment.config.faucets
          if (faucets.length > 0) {
            const url = faucets[0].url
            window.open(url, '_blank').focus()
          }
        },
        'cancelAction': async () => {
          await alert.dismiss();
        }   
      }
    })

    await alert.present();
  }

  async approveNFT() {
    const alert = await this.modalController.create({
      component: ActionModalComponent,
      componentProps:{
        'heading': 'Approve NFT',
        'message': 'To use this NFT as collateral, you must approve Chedda Protocol to manage this NFT. No tokens are transferred until you accept a loan offer.',
        'actionText': 'Approve',
        'modalAction': () => {
          return true
        },
        'cancelAction': async () => {
          await alert.dismiss();
        }   
      }
    })

    await alert.present();
    return alert
  }

  async showPurchaseConfirmationAlert(txHash: string) {
    const alert = await this.modalController.create({
      component: ActionModalComponent,
      componentProps:{
        'heading': 'Transaction sent',
        'message': 'Your purchased NFT will show up in your owned items once the transaction is confirmed.',
        'actionText': 'View transaction',
        'modalAction': () => {
          window.open(environment.config.ui.txUrlPrefix + txHash, '_blank').focus
        },
        'cancelAction': async () => {
          await alert.dismiss();
        }   
      }
    })

    await alert.present(); 
  }

  async showOkayAlert(title: string, message: string) {
    const alert = await this.modalController.create({
      component: ActionModalComponent,
      componentProps:{
        'heading': title,
        'message': message,
        'cancelAction': async () => {
          await alert.dismiss();
        }   
      }
    })

    await alert.present(); 
  }

  async showRewardConfirmationAlert(amount) {
    const alert = await this.modalController.create({
      component: ActionModalComponent,
      componentProps:{
        'heading': 'Reward!',
        'message': `Thanks for rating. 
          Your reward of ${amount} Chedda XP will be posted to your account once the transaction confirms on the blockchain.`,
        'cancelAction': async () => {
          await alert.dismiss();
        }   
      }
    })

    await alert.present(); 
  }
  
  // async showRewardReceivedToast(amount) {
  //   const toast =  await this.toastController.create({
  //     header: 'Chedda XP earned',
  //     message: `You just earned ${amount} XP`,
  //     position: 'bottom',
  //     duration: 3000
  //   })

  //   await toast.present()
  // }

  async showRewardReceivedToast(amount: string, timeout: number = 3000) {
    const toast = await this.modalController.create({
      component: SnackbarComponent,
      backdropDismiss: true,
      componentProps:{
        'header': 'Chedda XP earned',
        'message': `You just earned ${amount} XP`,
      },
      cssClass: 'modal-shadowless',
    })

    await toast.present()
    setTimeout(async () => {
      await toast.dismiss()
    }, timeout)
  }

  // async showToast(message: string, timeout: number = 3000) {
  //   const toast = await this.toastController.create({
  //     message: message,
  //     duration: timeout,
  //   })
  //   await toast.present()
  // }

  async showToast(message: string, timeout: number = 2500) {
    const toast = await this.modalController.create({
      component: SnackbarComponent,
      backdropDismiss: true,
      componentProps:{
        'message': message
      },
      cssClass: 'modal-shadowless',
    })

    await toast.present()
    setTimeout(async () => {
      await toast.dismiss()
    }, timeout)
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
