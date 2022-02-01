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
import { NFT } from '../../models/nft.model';
import { environment } from 'src/environments/environment';
import { GetLoanModalComponent } from 'src/app/borrow/components/get-loan-modal/get-loan-modal.component';

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
  account

  listingExists = false
  iAmOwner = false
  txPending = false
  env = environment

  private routeSubscription?: Subscription
  private accountSubscription?: Subscription
  private itemListingSubscription?: Subscription
  private listingCancelledSubscription?: Subscription
  private itemSoldSubscription?: Subscription

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
      this.itemListingSubscription?.unsubscribe()
      this.itemSoldSubscription?.unsubscribe()
      this.listingCancelledSubscription?.unsubscribe()
  }

  async onBuyButtonClicked() {
    if (this.wallet.isConnected()) {
      const hasSufficient = await this.wallet.balanceIsOver(this.nft.price)
      if (hasSufficient) {
        this.txPending = true
        let result = await this.market.buyItem(this.nft)
        if (result && result.hash) {
          this.alert.showPurchaseConfirmationAlert(result.hash)
        } else {
          this.txPending = false
        }
      } else {
        this.alert.showInsufficientBalanceAlert()
      }
    } else {
      // show error
      this.txPending = false
      this.alert.showConnectAlert()
    }
  }

  async onCancelListingClicked() {
    if (this.wallet.isConnected) {
      this.txPending = true
      let result = await this.market.cancelListing(this.nft)
      if (result) {
        this.showToast('Listing Cancelled', 'Your listing has been cancled')
      } else {
        this.txPending = false
      }
    } else {
      this.alert.showConnectAlert()
    }
  }

  async presentAlertPrompt() {
    const currency = environment.config.networkParams.nativeCurrency.symbol
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'List Your Item!',
      message: `Enter the price in ${currency} to list your item for sale`,
      inputs: [
        {
          name: 'price',
          type: 'number',
          placeholder: `Price (${currency})`,
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

  async onGetLoanClicked() {
    const modal = await this.modalController.create({
      component: GetLoanModalComponent,
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
        this.checkOwner()
    })

    this.itemListingSubscription = this.market.itemListedSubject.subscribe(async result => {
      if (result.contractAddress == this.nft.nftContract) {
        this.txPending = false
        this.checkListing()
      }
    })

    this.itemSoldSubscription = this.market.itemSoldSubject.subscribe(async result => {
      if (result.contractAddress == this.nft.nftContract) {
        this.txPending = false
        this.checkListing()
        this.checkOwner()
      }
    })

    this.listingCancelledSubscription = this.market.listingCancelledSubject.subscribe(async result => {
      if (result.contractAddress == this.nft.nftContract) {
        this.txPending = false
        this.checkListing()
      }
    })
  }

  private setPrice() {
    let price = ethers.utils.formatEther(this.nft.price)
    let currency = this.env.config.networkParams.nativeCurrency.symbol
    this.priceString = `BUY for ${price} ${currency}`
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
      this.txPending = true
      let result = await this.market.listItem(this.nft, price)
      if (result) {
        this.showListingConfirmationToast()
      }
    } catch (error) {
      this.txPending = false
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
