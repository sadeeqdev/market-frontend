import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';
import DappExplorer from '../../artifacts/CheddaDappExplorer.json'
import { Dapp } from '../dapps/models/dapp.model';

@Injectable({
  providedIn: 'root'
})
export class DappExplorerService {

  private dappExplorerContract: any
  private RatingMultiplier = 100

  constructor(
    private provider: DefaultProviderService,
    private wallet: WalletProviderService
  ) { 
    this.dappExplorerContract = new ethers.Contract(
      wallet.currentConfig.contracts.CheddaDappExplorer,
      DappExplorer.abi,
      provider.provider
      );

      console.log('wallet provider is ', this.wallet.provider)
      console.log('Explorer contract is ', this.dappExplorerContract);
      console.log('at address: ', this.dappExplorerContract.address)
  }

  async addRating(rating: number, dapp: Dapp) {
    const weightedRating = rating * this.RatingMultiplier
    console.log('sending rating: ', weightedRating)
    await this.dappExplorerContract.connect(this.wallet.signer).addRating(dapp.contractAddress, weightedRating)
  }

  async addReview(review: string, rating: number, dapp: Dapp) {
    await this.dappExplorerContract.addReview()
  }

  async averageRating(dapp: Dapp) {
    let averageRating = await this.dappExplorerContract.averageRating(dapp.contractAddress)
    return averageRating
  }

  async numberOfRatings(dapp: Dapp) {
    let numberOfRatings = await this.dappExplorerContract.numberOfRatings(dapp.contractAddress)
    return numberOfRatings
  }
}
