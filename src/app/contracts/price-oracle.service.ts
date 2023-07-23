import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service'
import { WalletProviderService } from '../providers/wallet-provider.service'
import MultiAssetPriceOracle from '../../artifacts/MultiAssetPriceOracle.json'
import { EnvironmentProviderService } from '../providers/environment-provider.service';

@Injectable({
  providedIn: 'root'
})
export class PriceOracleService {

  oracleContract

  constructor(
    private provider: DefaultProviderService,
    private wallet: WalletProviderService,
    private environmentService: EnvironmentProviderService,
  ) {
    this.initializeOracleContract();
    this.listenToEvents();
  }
  
  private initializeOracleContract() {
    const priceFeedAddress = this.wallet.currentConfig.contracts.PriceFeed;
    const priceFeedAbi = MultiAssetPriceOracle.abi;
    const provider = this.provider.provider;
  
    this.oracleContract = new ethers.Contract(priceFeedAddress, priceFeedAbi, provider);
  }

  listenToEvents(){
    this.environmentService.getEvent().subscribe((network) => {
      if (network) {
        this.initializeOracleContract();
      }
    });
  }

  async getAssetPrice(address: string): Promise<BigNumber> {
    return await this.oracleContract.readPrice(address, 1)
  }
}
