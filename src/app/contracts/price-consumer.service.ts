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
  priceFeedExists = false

  constructor(private provider: DefaultProviderService, wallet: WalletProviderService) {
    const contractAddress = wallet.currentConfig.contracts.ChainlinkPriceConsumer
    if (contractAddress) {
      this.priceConsumerContract = new ethers.Contract(
        contractAddress,
        ChainlinkPriceConsumer.abi,
        provider.provider
        );
        this.priceFeedExists = true
        console.log('******************* Price feed exists')
    } else {
      console.log('********************* No price feed')
    }
  }

  async latestPriceRaw(): Promise<BigNumber | null> {
    if (this.priceConsumerContract) {
      return await this.priceConsumerContract.getLatestPrice()
    } else {
      return null
    }
  }

  async latestPriceUSD(): Promise<number | null> {
    const priceRaw = await this.latestPriceRaw()
    if (priceRaw) {
      return (priceRaw.div(10**6).toNumber()/100)
    } else {
      return null
    }
  }

  toUSD(price: string, usdRate: number, decimals: number): string {
    const usdPrice = (Number(price) * usdRate).toFixed(decimals)
    return usdPrice
  }
}
