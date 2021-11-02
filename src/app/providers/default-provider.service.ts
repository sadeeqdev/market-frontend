import { Injectable } from '@angular/core';
import { ethers, providers } from 'ethers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DefaultProviderService {

  provider: ethers.providers.JsonRpcProvider

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(environment.jsonRpc.testnet.local);
    console.log('provider is ', this.provider);
  }

  async getBlockNumber() {
    const blockNumber = await this.provider.getBlockNumber();
    console.log('block number is: ', blockNumber);
  }

  getBalance() {

  }
}