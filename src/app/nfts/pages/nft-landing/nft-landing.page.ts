import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSelect } from '@ionic/angular';
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
  @ViewChild('filterSelect') filterSelect: IonSelect
  @ViewChild('sortSelect') sortSelect: IonSelect
  collections = []
  nfts: any[] = [

  ]

  constructor(
    private router: Router,
    private marketService: CheddaMarketService,
    private explorerService: MarketExplorerService,
  ) { }

  async ngOnInit() {
    this.collections = await this.explorerService.getCollections()
    await this.loadAllNFTs()
  }

  async loadAllNFTs() {
    let nfts = await this.explorerService.getMarketItems()
    this.nfts = this.shuffle(nfts)
  }

  async loadPopularNFTs() {
    this.nfts = await this.explorerService.loadPopularItems()
  }

  async loadNewNFTs() {
    this.nfts = await this.explorerService.loadNewItems()
  }

  onNFTSelected(nft: NFT) {
    this.router.navigate(['/', 'market', 'details'])
  }

  onCollectionSelected(collection: NFTCollection) {
    console.log('collection selected: ', collection)
    this.router.navigate(['./', 'market', 'collection', collection.nftContract])
  }

  onFilterChanged($event) {
    if (!this.filterSelect.value) {
      return
    }
    switch (this.filterSelect.value) {
      case 'all':
        this.loadAllNFTs()
        break
      case 'popular':
        this.loadPopularNFTs()
        break
      case 'new':
        this.loadNewNFTs()
        break
    }
  }

  onSortChanged($event) {
    if (!this.sortSelect.value) {
      return
    }
    switch (this.sortSelect.value) {

      case 'random':
        this.shuffle(this.nfts)
        break
      case 'recent':
        this.quickSort(this.nfts, 0, this.nfts.length - 1, 'listingTime', -1)
        break
      case 'lowest':
        this.quickSort(this.nfts, 0, this.nfts.length - 1, 'price', 1)
        break
      case 'highest':
        this.quickSort(this.nfts, 0, this.nfts.length - 1, 'price', -1)
        break
    }
  }
  swap(items: NFT[], leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }

  partition(items: NFT[], left, right, key, order) {
    var pivot = items[Math.floor((right + left) / 2)][key], //middle element
      i = left, //left pointer
      j = right; //right pointer
     const orderBigNumber = BigNumber.from(order)
    while (i <= j) {
      while (items[i][key].mul(orderBigNumber).lt(pivot.mul(orderBigNumber))) {
        i++;
      }
      while (items[j][key].mul(orderBigNumber).gt(pivot.mul(orderBigNumber))) {
        j--;
      }
      if (i <= j) {
        this.swap(items, i, j); //sawpping two elements
        i++;
        j--;
      }
    }
    return i;
  }

  quickSort(items: NFT[], left, right, key, order) {
    var index;
    if (items.length > 1) {
      index = this.partition(items, left, right, key, order); //index returned from partition
      if (left < index - 1) { //more elements on the left side of the pivot
        this.quickSort(items, left, index - 1, key, order);
      }
      if (index < right) { //more elements on the right side of the pivot
        this.quickSort(items, index, right, key, order);
      }
    }
    return items;
  }

  shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }
}
