import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import MarketExplorer from '../../artifacts/CheddaMarketExplorer.json'
import { CollectionMetadata, NFTCollection } from '../nfts/models/collection.model';
import { NFT, NFTMetadata } from '../nfts/models/nft.model';
import { WalletProviderService } from '../providers/wallet-provider.service';

@Injectable({
  providedIn: 'root'
})
export class MarketExplorerService {

  private explorerContract: any
  private nftContract: any
  private nfts: NFT[]

  constructor(provider: DefaultProviderService, wallet: WalletProviderService, private http: HttpClient) {
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

  async getCollections() {
    let collections = await this.explorerContract.getCollections()
    collections = await this.populateMultipleCollectionsMetadata(collections)
    console.log('collections are ', collections)
    return collections
  
  }

  async loadCollection(address: string): Promise<NFTCollection> {
    const collection = await this.explorerContract.collections(address);
    return await this.populateCollectionMetadata(collection)
  }

  // specific collection
  async loadCollectionDetails(address: string) {
  }

  async loadCollectionStats(address: string) {

  }

  async loadMarketItem(address: string, tokenID: string) {
    let marketItem = await this.explorerContract.getMarketItem(address, tokenID);
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

  private async populateCollectionMetadata(collection: NFTCollection) {
    let metadata = await this.http.get<CollectionMetadata>(collection.metadataURI).toPromise()
      let c = {
        ...collection,
        metadata
      }
      return c 
  }

  private async populateMultipleCollectionsMetadata(collections: NFTCollection[]) {
    let populated = await Promise.all(collections.map(async c => 
      this.populateCollectionMetadata(c)
    ))
    return populated
  }

  private async populateNFTMetadata(nft: NFT) {
    let metadata = await this.http.get<NFTMetadata>(nft.tokenURI).toPromise()
    let n = {
      ...nft,
      metadata
    }
    return n
  }

  private async populateMultipleNftsMetadata(nfts: NFT[]) {
    let populated = await Promise.all(nfts.map(async n => 
        await this.populateNFTMetadata(n)
    ))
    return populated
  }
}
