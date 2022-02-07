import { Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import ChainlinkPriceConsumer from '../../artifacts/ChainlinkPriceConsumerV3.json'
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';

@Injectable({
  providedIn: 'root'
})
export class PriceConsumerService {

  priceConsumerContract
  numberOfDecimals = 7

  constructor(private provider: DefaultProviderService, wallet: WalletProviderService) {
    this.priceConsumerContract = new ethers.Contract(
      wallet.currentConfig.contracts.ChainlinkPriceConsumer,
      ChainlinkPriceConsumer.abi,
      provider.provider
      );
    }

    async latestPriceRaw(): Promise<BigNumber> {
      return await this.priceConsumerContract.getLatestPrice()
    }

    async latestPriceUSD(): Promise<number> {
      const priceRaw = await this.latestPriceRaw()
     return (priceRaw.div(10**6).toNumber()/100)
    }

    toUSD(price: string, usdRate: number, decimals: number): string {
      const usdPrice = (Number(price) * usdRate).toFixed(decimals)
      return usdPrice
    }
}
