import { Injectable } from '@angular/core';
import { ethers, providers } from 'ethers';
import { EnvironmentProviderService } from 'src/app/providers/environment-provider.service';
@Injectable({
  providedIn: 'root'
})

export class DefaultProviderService {

  provider: ethers.providers.StaticJsonRpcProvider

  constructor(
    private environmentService: EnvironmentProviderService
  ) {
    this.environmentService.getEvent().subscribe((network) => {
      if(network){
        this.provider = new ethers.providers.StaticJsonRpcProvider(network.jsonRpcUrl);
        return
      }
    });
    this.provider = new ethers.providers.StaticJsonRpcProvider(this.environmentService.environment.jsonRpcUrl);
    this.provider.pollingInterval = 20000;
  }

  async getBlockNumber() {
    const blockNumber = await this.provider.getBlockNumber();
    console.log('block number is: ', blockNumber);
  }

  getBalance() {

  }
}
