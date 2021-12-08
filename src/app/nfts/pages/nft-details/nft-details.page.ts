import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonButton, ModalController, NavController } from '@ionic/angular';
import { ethers } from 'ethers';
import { Subscription } from 'rxjs';
import { NftLikeModalComponent } from 'src/app/components/nft-like-modal/nft-like-modal.component';
import { CheddaMarketService } from 'src/app/contracts/chedda-market.service';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
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
  private routeSubscription?: Subscription

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private modalController: ModalController,
    private wallet: WalletProviderService,
    private alert: GlobalAlertService,
    private market: CheddaMarketService,
    private explorer: MarketExplorerService) { }

  ngOnInit() {
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
        this.setPrice()
        this.loadLikes()
      } catch (error) {
        //todo: show error before navigating back
        console.error('caught error: ', error)
        this.navController.navigateBack('/nfts')
      }
    })
  }

  ngOnDestroy(): void {
      this.routeSubscription?.unsubscribe()
  }

  setPrice() {
    let price = ethers.utils.formatEther(this.nft.price)
    this.priceString = `BUY for ${price} MATIC`
  }

  async loadLikes() {
    this.numberOfLikes = await this.explorer.getItemLikes(this.nft.nftContract, this.nft.tokenID)
  }

  async buyButtonClicked() {
    if (this.wallet.isConnected()) {
      const hasSufficient = await this.wallet.balanceIsOver(this.nft.price)
      if (hasSufficient) {
        let result = await this.market.buyItem(this.nft)
        if (result && result.hash) {
          this.alert.showPurchaseConfirmationAlert(result.hash)
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

  async showLikeModal() {
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


  private async showConfirmAlert(amount) {
    await this.alert.showRewardConfirmationAlert(amount)
  }
}
