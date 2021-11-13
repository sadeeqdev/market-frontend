import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BigNumber, ethers } from 'ethers';
import { CheddaMarketService } from 'src/app/contracts/chedda-market.service';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { NFTCollection } from '../../models/collection.model';
import { NFT } from '../../models/nft.model';

@Component({
  selector: 'app-nft-landing',
  templateUrl: './nft-landing.page.html',
  styleUrls: ['./nft-landing.page.scss'],
})
export class NftLandingPage implements OnInit {

  collections = []
  nfts: any[] = [

  ]

  constructor(
    private router: Router,
    private marketService: CheddaMarketService, 
    private explorerService: MarketExplorerService,
    ) { }

  async ngOnInit() {
    this.nfts = await this.explorerService.getMarketItems()
    this.collections = await this.explorerService.getCollections()
    console.log('nfts are: ', this.nfts)
  }

  onNFTSelected(nft: NFT) {
    console.log('nft selected: ', nft)
    this.router.navigate(['/', 'nfts', 'details'])
  }

  onCollectionSelected(collection: NFTCollection) {
    console.log('collection selected: ', collection)
    this.router.navigate(['./', 'nfts', 'collection', collection.nftContract])
  }

  formattedPrice(price: BigNumber) {
    return ethers.utils.formatEther(price)
  }
}
