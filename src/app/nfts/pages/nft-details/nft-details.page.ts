import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonButton, NavController } from '@ionic/angular';
import { BigNumber, ethers } from 'ethers';
import { Subscription } from 'rxjs';
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
  private routeSubscription?: Subscription

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
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
      } catch (error) {
        //todo: show error before navigating back
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
}
