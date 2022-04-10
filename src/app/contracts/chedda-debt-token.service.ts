import { Injectable } from '@angular/core';
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';
import CheddaDebtToken from '../../artifacts/CheddaDebtToken.json'
import { BigNumber, ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class CheddaDebtTokenService {

  constructor(private provider: DefaultProviderService, private wallet: WalletProviderService,) {
  }

  async totalDebt(contract): Promise<BigNumber> {
    return await contract.totalAsset()
  }

  async debtOf(contract, address: string): Promise<BigNumber> {
    return await contract.assetsOf(address)
  }

// todo: change to debtPerShare
  async debtPerShare(contract): Promise<BigNumber> {
    return await contract.assetsPerShare()
  }

  async previewRedeem(contract, shares): Promise<BigNumber> {
    return await contract.previewRedeem(shares)
  }

  contractAt(address: string) {
    return new ethers.Contract(
      address,
      CheddaDebtToken.abi,
      this.provider.provider
    )
  }
}
