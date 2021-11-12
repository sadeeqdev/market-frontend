import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment';
import { NFT } from '../pages/nfts/nft.model';
import { DefaultProviderService } from '../providers/default-provider.service';
import ChedaMarket from '../../artifacts/CheddaMarket.json'
import CheddaNFT from '../../artifacts/CheddaNFT.json'

@Injectable({
  providedIn: 'root'
})
export class CheddaMarketService {

  marketContract: any
  nftContract: any
  nfts: NFT[]

  constructor(private provider: DefaultProviderService, private http: HttpClient) {
    this.marketContract = new ethers.Contract(
      environment.networks.local.addresses.CheddaMarket,
      ChedaMarket.abi,
      provider.provider
      );
      console.log('NFT market contract is ', this.marketContract);
      console.log('at address: ', this.marketContract.address)
  }

  async getMarketItems(): Promise<NFT[]> {
    let items = await this.marketContract.getAllListings()
    return items
  }

  getMarketItemsInCollection(address: string) {

  }
}
