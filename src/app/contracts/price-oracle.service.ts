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

  constructor(provider: DefaultProviderService, private wallet: WalletProviderService, 
    private environmentService: EnvironmentProviderService,
     private http: HttpClient) {
    
    this.environmentService.getEvent().subscribe((network) => {
      if(network){
        this.oracleContract = new ethers.Contract(
          this.wallet.currentConfig.contracts.PriceFeed,
          MultiAssetPriceOracle.abi,
          provider.provider
        );
      }
    });
    
    this.oracleContract = new ethers.Contract(
      this.wallet.currentConfig.contracts.PriceFeed,
      MultiAssetPriceOracle.abi,
      provider.provider
    );
  }

  async getAssetPrice(address: string): Promise<BigNumber> {
    return await this.oracleContract.readPrice(address, 1)
  }
}
