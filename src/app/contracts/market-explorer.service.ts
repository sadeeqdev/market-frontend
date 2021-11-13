import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment';
import { DefaultProviderService } from '../providers/default-provider.service';
import MarketExplorer from '../../artifacts/CheddaMarketExplorer.json'
import { CollectionMetadata, NFTCollection } from '../nfts/models/collection.model';
import { NFT, NFTMetadata } from '../nfts/models/nft.model';

@Injectable({
  providedIn: 'root'
})
export class MarketExplorerService {

  explorerContract: any
  nftContract: any
  nfts: NFT[]

  constructor(private provider: DefaultProviderService, private http: HttpClient) {
    this.explorerContract = new ethers.Contract(
      environment.networks.local.addresses.CheddaMarketExplorer,
      MarketExplorer.abi,
      provider.provider
      );
      console.log('Explorer contract is ', this.explorerContract);
      console.log('at address: ', this.explorerContract.address)
  }

  async getMarketItems(): Promise<any[]> {
    let items = await this.explorerContract.getAllItems()
    items = await this.populateNftMetadata(items)
    return items
  }

  async populateNftMetadata(nfts: NFT[]) {
    let populated = await Promise.all(nfts.map(async n => {
      let metadata = await this.http.get<NFTMetadata>(n.tokenURI).toPromise()
      let nft = {
        ...n,
        metadata
      }
      return nft
    }))
    return populated
  }

  async getCollections() {
    let collections = await this.explorerContract.getCollections()
    collections = await this.populateCollectionMetadata(collections)
    console.log('collections are ', collections)
    return collections
  }

  async populateCollectionMetadata(collections: NFTCollection[]) {
    let populated = await Promise.all(collections.map(async c => {
      let metadata = await this.http.get<CollectionMetadata>(c.metadataURI).toPromise()
      let collection = {
        ...c,
        metadata
      }
      return collection
    }))
    return populated
  }

  getMarketItemsInCollection(address: string) {
  }

}
