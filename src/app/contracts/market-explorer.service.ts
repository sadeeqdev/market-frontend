import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import MarketExplorer from '../../artifacts/CheddaMarketExplorer.json'
import { CollectionMetadata, NFTCollection, NFTCollectionWithLikes } from '../nfts/models/collection.model';
import { NFTMetadata, NFTWithLikes } from '../nfts/models/nft.model';
import { WalletProviderService } from '../providers/wallet-provider.service';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MarketExplorerService {

  private explorerContract: any

  constructor(provider: DefaultProviderService, private wallet: WalletProviderService, private http: HttpClient) {
    this.explorerContract = new ethers.Contract(
      wallet.currentConfig.contracts.CheddaMarketExplorer,
      MarketExplorer.abi,
      provider.provider
      );
  }

  // All Items
  async getMarketItems(): Promise<any[]> {
    let items = await this.explorerContract.getAllItems()
    items = await this.populateMultipleNftsMetadata(items)
    return items
  }

  async loadPopularItems(): Promise<any[]> {
    let items = await this.explorerContract.popularItems()
    console.log('popular items are: ', items)
    items = await this.populateMultipleNftsMetadata(items)
    return items
  }

  async loadNewItems(): Promise<any[]> {
    const last30days = moment().subtract(30, 'days').unix()
    let items = await this.explorerContract.newlyListedItems(last30days)
    items = await this.populateMultipleNftsMetadata(items)
    return items
  }

  async getCollections() {
    let collections = await this.explorerContract.getCollections()
    collections = await this.populateMultipleCollectionsMetadata(collections)
    console.log('collections are ', collections)
    return collections
  }

  async loadCollection(address: string): Promise<NFTCollection> {
    const collection = await this.explorerContract.getCollectionDetails(address);
    return await this.populateCollectionMetadata(collection)
  }

  async likeItem(address: string, tokenID: string) {
    return await this.explorerContract.connect(this.wallet.signer).likeItem(address, tokenID)
  }

  async dislikeItem(address: string, tokenID: string) {
    return await this.explorerContract.connect(this.wallet.signer).dislikeItem(address, tokenID)
  }

  async getItemLikes(address: string, tokenID: string) {
    return await this.explorerContract.itemLikes(address, tokenID)
  }

  async getItemDislikes(address: string, tokenID: string) {
    return await this.explorerContract.itemDislikes(address, tokenID)
  }
  
  // specific collection
  async loadCollectionDetails(address: string) {
  }

  async loadCollectionStats(address: string) {

  }

  async loadMarketItem(address: string, tokenID: string) {
    let marketItem = await this.explorerContract.getMarketItemWithLikes(address, tokenID);
    marketItem = await this.populateNFTMetadata(marketItem)
    return marketItem
  }

  async loadCollectionItems(address: string) {
    const items =  await this.explorerContract.itemsInCollection(address)
    return this.populateMultipleNftsMetadata(items)
  }

  async loadItemsOwned(address: string) {
    const items = await this.explorerContract.getItemsOwned(address)
    return this.populateMultipleNftsMetadata(items)
  }

  private async populateCollectionMetadata(collection: NFTCollectionWithLikes) {
    let metadata = await this.http.get<CollectionMetadata>(collection.collection.metadataURI).toPromise()
      let c = {
        ...collection.collection,
        likes: collection.likesDislikes.likes,
        dislikes: collection.likesDislikes.dislikes,
        metadata
      }
      return c 
  }

  private async populateMultipleCollectionsMetadata(collections: NFTCollectionWithLikes[]) {
    let populated = await Promise.all(collections.map(async c => 
      this.populateCollectionMetadata(c)
    ))
    return populated
  }

  private async populateNFTMetadata(nft: NFTWithLikes) {
    let metadata = await this.http.get<NFTMetadata>(nft.item.tokenURI).toPromise()
    let n = {
      ...nft.item,
      likes: nft.likesDislikes.likes,
      dislikes: nft.likesDislikes.dislikes,
      metadata
    }
    return n
  }

  private async populateMultipleNftsMetadata(nfts: NFTWithLikes[]) {
    let populated = await Promise.all(nfts.map(async n => 
        await this.populateNFTMetadata(n)
    ))
    return populated
  }
}
