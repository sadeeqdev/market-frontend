import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BigNumber, ethers } from 'ethers';
import { CheddaMarketService } from 'src/app/contracts/chedda-market.service';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { NFTCollection } from '../../models/collection.model';
import { NFT } from '../../models/nft.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.scss'],
})
export class NftCardComponent implements OnInit {

  @Input() nft: any
  currency

  constructor(
    private router: Router, 
    private wallet: WalletProviderService, 
    private market: CheddaMarketService,
    private alert: GlobalAlertService,) { }

  ngOnInit() {
    this.currency = environment.config.networkParams.nativeCurrency.symbol
  }

  onNFTSelected(nft: NFT) {
    this.router.navigate(['/', 'market', 'details', nft.nftContract, nft.tokenID.toString()])
  }

  onCollectionSelected(collection: NFTCollection) {
    console.log('collection selected: ', collection)
    this.router.navigate(['./', 'market', 'collection', collection.nftContract])
  }

  async onBuyItemClicked($event, nft: NFT) {
    $event.stopPropagation()
    if (this.wallet.isConnected()) {
      const hasSufficient = await this.wallet.balanceIsOver(nft.price)
      if (hasSufficient) {
        let result = await this.market.buyItem(nft)
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


  formattedPrice(price: BigNumber) {
    console.log('formatting price; ', price)
    if (price) {
      return ethers.utils.formatEther(price)
    } else {
      return '-'
    }
  }
}
