import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service'
import { WalletProviderService } from '../providers/wallet-provider.service'
import MultiAssetPriceOracle from '../../artifacts/MultiAssetPriceOracle.json'

@Injectable({
  providedIn: 'root'
})
export class PriceOracleService {

  oracleContract

  constructor(provider: DefaultProviderService, private wallet: WalletProviderService, private http: HttpClient) {
    this.oracleContract = new ethers.Contract(
      wallet.currentConfig.contracts.PriceFeed,
      MultiAssetPriceOracle.abi,
      provider.provider
      );
  }

  async getAssetPrice(address: string): Promise<BigNumber> {
    return this.oracleContract.readPrice(address, 0)
  }
}
