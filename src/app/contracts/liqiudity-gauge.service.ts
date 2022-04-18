import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';
import LiquidityGauge from '../../artifacts/LiquidityGauge.json'

@Injectable({
  providedIn: 'root'
})
export class LiqiudityGaugeService {

  constructor(private provider: DefaultProviderService, private wallet: WalletProviderService, private http: HttpClient) {
      this.registerForEvents()
  }

  async claimAmount(contract, address: string): Promise<any> {
    return await contract.claimAmount(address)
  }

  async claim(contract) {
    await contract.connect(this.wallet.signer).claim()
  }
  async registerForEvents() {

  }

  contractAt(address: string) {
    return new ethers.Contract(
      address,
      LiquidityGauge.abi,
      this.provider.provider
    )
  }
}
