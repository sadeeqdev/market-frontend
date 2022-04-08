import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';
import GaugeController from '../../artifacts/GaugeController.json'

@Injectable({
  providedIn: 'root'
})
export class GaugeControllerService {

  gaugeControllerContract
  constructor(provider: DefaultProviderService, private wallet: WalletProviderService, private http: HttpClient) {
    this.gaugeControllerContract = new ethers.Contract(
      wallet.currentConfig.contracts.GaugeController,
      GaugeController.abi,
      provider.provider
      );
      this.registerForEvents()
  }

  async vote(gaugeAddress: string) {
    await this.gaugeControllerContract.connect(this.wallet.signer).vote(gaugeAddress)
  }

  async gaugeVotes(gaugeAddress: string): Promise<BigNumber> {
    return await this.gaugeControllerContract.gaugeVotes(gaugeAddress)
  }

  registerForEvents() {}
}
