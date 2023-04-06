import { Injectable } from '@angular/core';
import { ethers, providers } from 'ethers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DefaultProviderService {

  provider: ethers.providers.StaticJsonRpcProvider

  constructor() {
    this.provider = new ethers.providers.StaticJsonRpcProvider(environment.jsonRpcUrl);
    this.provider.pollingInterval = 20000;
  }

  async getBlockNumber() {
    const blockNumber = await this.provider.getBlockNumber();
    console.log('block number is: ', blockNumber);
  }

  getBalance() {

  }
}
