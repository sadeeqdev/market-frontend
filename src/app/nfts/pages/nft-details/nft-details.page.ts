import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonButton, NavController } from '@ionic/angular';
import { BigNumber, ethers } from 'ethers';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { NFT } from '../../models/nft.model';

@Component({
  selector: 'app-nft-details',
  templateUrl: './nft-details.page.html',
  styleUrls: ['./nft-details.page.scss'],
})
export class NftDetailsPage implements OnInit {

  @ViewChild('buyButton') buyButton: IonButton
  priceString = ''
  nft: NFT

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private explorer: MarketExplorerService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async paramMap => {
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

  setPrice() {
    let price = ethers.utils.formatEther(this.nft.price)
    this.priceString = `BUY for ${price} MATIC`
  }

}
