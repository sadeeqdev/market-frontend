import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import StakedChedda from '../../artifacts/sChedda.json'
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';

@Injectable({
  providedIn: 'root'
})
export class StakedCheddaService {

  stakedCheddaContract: any
  
  constructor(provider: DefaultProviderService, private wallet: WalletProviderService, private http: HttpClient) {
    this.stakedCheddaContract = new ethers.Contract(
      wallet.currentConfig.contracts.sChedda,
      StakedChedda.abi,
      provider.provider
      );
  }

  async balanceOf(address: string): Promise<BigNumber> {
    return await this.stakedCheddaContract.balanceOf(address)
  }

  async totalSupply(): Promise<BigNumber> {
    return await this.stakedCheddaContract.totalSupply()
  }

  async stake(amount: BigNumber): Promise<BigNumber> {
    return await this.stakedCheddaContract.connect(this.wallet.signer).stake(amount)
  }

  async unstake(amount: BigNumber) {
    await this.stakedCheddaContract.connect(this.wallet.signer).unstake(amount)
  }

  async totalAssets(): Promise<BigNumber> {
    return await this.stakedCheddaContract.totalAssets()
  }

  address(): string {
    return this.wallet.currentConfig.contracts.sChedda
  }
}
