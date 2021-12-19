import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonButton, ModalController, NavController, ToastController } from '@ionic/angular';
import { ethers } from 'ethers';
import { Subscription } from 'rxjs';
import { NftLikeModalComponent } from 'src/app/components/nft-like-modal/nft-like-modal.component';
import { CheddaMarketService } from 'src/app/contracts/chedda-market.service';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { ZeroAddress } from 'src/app/shared/constants';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { ListNftModalComponent } from '../../components/list-nft-modal/list-nft-modal.component';
import { NFT } from '../../models/nft.model';

@Component({
  selector: 'app-nft-details',
  templateUrl: './nft-details.page.html',
  styleUrls: ['./nft-details.page.scss'],
})
export class NftDetailsPage implements OnInit, OnDestroy {

  @ViewChild('buyButton') buyButton: IonButton
  priceString = ''
  nft: NFT
  numberOfLikes
  iAmOwner = false
  account
  listingExists = false
  private routeSubscription?: Subscription
  private accountSubscription?: Subscription

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController,
    private wallet: WalletProviderService,
    private alert: GlobalAlertService,
    private market: CheddaMarketService,
    private explorer: MarketExplorerService) { }

  async ngOnInit() {
    await this.subscribeToRouteChanges()
  }

  ngOnDestroy(): void {
      this.routeSubscription?.unsubscribe()
      this.accountSubscription?.unsubscribe()
  }


  async onBuyButtonClicked() {
    if (this.wallet.isConnected()) {
      const hasSufficient = await this.wallet.balanceIsOver(this.nft.price)
      if (hasSufficient) {
        let result = await this.market.buyItem(this.nft)
        if (result && result.hash) {
          this.alert.showPurchaseConfirmationAlert(result.hash)
          setTimeout(() => {
            this.checkListing()
            this.checkOwner()
          }, 3000)
        }
        console.log('buy result is: ', result)
      } else {
        this.alert.showInsufficientBalanceAlert()
      }
    } else {
      // show error
      this.alert.showConnectAlert()
    }
  }

  async onCancelListingClicked() {
    if (this.wallet.isConnected) {
      let result = await this.market.cancelListing(this.nft)
      if (result) {
        this.showToast('Listing Cancelled', 'Your listing has been cancled')
        setTimeout(() => {
          this.checkListing()
        }, 3000)
      }
    } else {
      this.alert.showConnectAlert()
    }
  }

  async onListForSaleClicked() {
    if (this.wallet.isConnected) {
      const modal = await this.modalController.create({
        component: ListNftModalComponent,
        cssClass: 'stack-modal',
        showBackdrop: true,
        componentProps: {
          nft: this.nft
        }
      })
      modal.onDidDismiss().then(async (result) => {
        if (result && result.data) {
          await this.showConfirmAlert(result.data)
          setTimeout(() => {
            this.loadLikes()
          }, 3000)
        }
      })
      await modal.present() 
    } else {
      this.alert.showConnectAlert()
    }
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'List Your Item!',
      message: 'Enter the price in MATIC to list your item for sale',
      inputs: [
        {
          name: 'price',
          type: 'number',
          placeholder: 'Price (MATIC)',
          min: 0,
          max: 10000000000,
          attributes: {
            inputMode: 'decimal'
          }
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'List Item',
          handler: (data) => {
            if (data.price) {
              this.listItem(data.price)
            } else {
              this.showInvalidPriceToast()
            }
            console.log('Confirm Ok price = ', data.price);
          }
        }
      ]
    });

    await alert.present();
  }

  async onLikeClicked() {
    const modal = await this.modalController.create({
      component: NftLikeModalComponent,
      cssClass: 'stack-modal',
      showBackdrop: true,
      componentProps: {
        nft: this.nft
      }
    })
    modal.onDidDismiss().then(async (result) => {
      if (result && result.data) {
        await this.showConfirmAlert(result.data)
        setTimeout(() => {
          this.loadLikes()
        }, 3000)
      }
    })
    await modal.present()
  }

  private async subscribeToRouteChanges() {
    this.routeSubscription = this.route.paramMap.subscribe(async paramMap => {
      if (!paramMap.has('contractAddress')) {
        this.navController.navigateBack('/nfts')
        return
      }
      try {
        const address = paramMap.get('contractAddress')
        const tokenID = paramMap.get('tokenID')
        if (!(address && tokenID)) {
          this.navController.navigateBack('/nfts')
          return
        }
        this.nft = await this.explorer.loadMarketItem(address, tokenID)
        await this.checkListing()
        this.setPrice()
        this.loadLikes()

        this.subscribeToAccountChanges()
      } catch (error) {
        //todo: show error before navigating back
        console.error('caught error: ', error)
        this.navController.navigateBack('/nfts')
      }
    })
  }

  private async subscribeToAccountChanges() {
    // set initially to remove race condition in checking NFT ownership
    this.accountSubscription = this.wallet.accountSubject.subscribe(async account => {
        this.account = account
        console.log('setting account to ', account)
        this.checkOwner()
    })
  }

  private setPrice() {
    let price = ethers.utils.formatEther(this.nft.price)
    this.priceString = `BUY for ${price} MATIC`
  }

  private async loadLikes() {
    this.numberOfLikes = await this.explorer.getItemLikes(this.nft.nftContract, this.nft.tokenID)
  }

  private async checkListing() {
    let listing = await this.market.listingForItem(this.nft.nftContract, this.nft.tokenID)
    this.listingExists = listing.nftContract !== ZeroAddress
  }

  private async checkOwner() {
    if (this.account) {
      let items = await this.explorer.loadItemsOwned(this.account)
      console.log('items owned are: ', items)
      for (const item of items) {
        if (item.nftContract == this.nft.nftContract && item.tokenID.toString() == this.nft.tokenID) {
          this.iAmOwner = true
          break
        }
      }
    }
  }

  private async listItem(price: string) {
    try {
      let result = await this.market.listItem(this.nft, price)
      console.log('item listed witih result: ', result)
      if (result) {
        this.showListingConfirmationToast()
        setTimeout(() => {
          this.checkListing()
        }, 3000)
      }
    } catch (error) {
      
    }

  }

  private async showConfirmAlert(amount) {
    await this.alert.showRewardConfirmationAlert(amount)
  }

  private async showToast(title: string, message: string) {
    const toast =  await this.toastController.create({
      header: title,
      message: message,
      position: 'bottom',
      duration: 5000
    })

    await toast.present() 
  }

  private async showListingConfirmationToast() {
    await this.showToast('Item Listed', `Your item has been listed in the market.`)
  }
  async showInvalidPriceToast() {
    await this.showToast('Invalid Price', `Please enter a valid price to list this item.`)
  }
}
