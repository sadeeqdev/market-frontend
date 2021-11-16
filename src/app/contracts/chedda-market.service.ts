import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import ChedaMarket from '../../artifacts/CheddaMarket.json'
import CheddaNFT from '../../artifacts/CheddaNFT.json'
import { NFT } from '../nfts/models/nft.model';
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';

@Injectable({
  providedIn: 'root'
})
export class CheddaMarketService {

  marketContract: any
  nftContract: any
  nfts: NFT[]

  constructor(provider: DefaultProviderService, wallet: WalletProviderService, private http: HttpClient) {
    this.marketContract = new ethers.Contract(
      wallet.currentConfig.contracts.CheddaMarket,
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
