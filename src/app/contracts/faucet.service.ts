import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import Faucet from '../../artifacts/Faucet.json'
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaucetService {

  faucetContract: any
  
  constructor(provider: DefaultProviderService, private wallet: WalletProviderService, private http: HttpClient) {
    this.faucetContract = new ethers.Contract(
      wallet.currentConfig.contracts.Faucet,
      Faucet.abi,
      provider.provider
      );
  }

  async dripChedda() {
    const tokenAddress = environment.config.contracts.Chedda
    await this.drip(tokenAddress)
  }

  async dripUSDC() {
    const tokenAddress = environment.config.contracts.USDC
    await this.drip(tokenAddress)
  }

  async dripWrappedNativeToken() {
    const tokenAddress = environment.config.contracts.WrappedNative
    await this.drip(tokenAddress)
  }

  async drip(token: string) {
    await this.faucetContract.connect(this.wallet.signer).drip(token)
  }
}
