import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';
import MarketNFT from '../../artifacts/MarketNFT.json'
import ERC721 from '../../artifacts/ERC721.json'
import { NFTWithLikes, NFTMetadata } from '../nfts/models/nft.model';
@Injectable({
  providedIn: 'root'
})
export class MarketNftService {

  private nftContract: any

  constructor(private provider: DefaultProviderService, private wallet: WalletProviderService, private http: HttpClient) {
    this.nftContract = new ethers.Contract(
      wallet.currentConfig.contracts.CheddaMarketExplorer,
      MarketNFT.abi,
      provider.provider
      );
  }

  marketNFTContract(address: string): any {
    const nftContract = new ethers.Contract(
      address,
      MarketNFT.abi,
      this.provider.provider
      ); 
    return nftContract
  }

  async fetchNFTMetadata(nft: any, tokenIds: string[]): Promise<NFTMetadata[]> {
    // const nft = this.marketNFTContract(nftAddress)
    const tokenURI1 = await nft.tokenURI("1")
    const nftItems = await this.populateTokenMetadata(nft, tokenIds)
    return nftItems
  }

  async ownedTokenIds(contractAddress: string, address: string): Promise<number[]> {
    const tokenIds = await this.marketNFTContract(contractAddress).ownedTokenIds(address)
    return tokenIds
  }

  async getTokenURI(contract: any, tokenId: string): Promise<string> {
    return await contract.tokenURI(tokenId)
  }

  async populateTokenMetadata(contract: any, tokenIds: string[]): Promise<any> {
    const metadataURIs = await Promise.all(tokenIds.map(async (id) => {
      const url = await this.getTokenURI(contract, id);
      return `${url}.json`;
    }))
    const nfts = await Promise.all(metadataURIs.map(async (uri) => {
      let metadata: any;
      try {
        metadata = await this.http.get<NFTMetadata>(uri).toPromise();
      } catch (error) {
        console.error('caught error processing nft: ', uri);
      }
      return metadata;
    }))

    return nfts
  }
}
