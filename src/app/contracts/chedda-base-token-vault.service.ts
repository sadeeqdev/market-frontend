import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';
import CheddaBaseTokenVault from '../../artifacts/CheddaBaseTokenVault.json'

@Injectable({
  providedIn: 'root'
})
export class CheddaBaseTokenVaultService {
  constructor(private provider: DefaultProviderService, private wallet: WalletProviderService, private http: HttpClient) {
  }

  // Vault
  async depositAsset(contract, amount: BigNumber, toAccount: string) {
    return await contract.connect(this.wallet.signer).deposit(amount, toAccount)
  }

  async redeem(contract, amount: BigNumber, toAccount: string) {
    return await contract.connect(this.wallet.signer).redeem(amount, toAccount, toAccount)
  }

  async addCollateral(contract, token: string, amount: BigNumber) {
    return await contract.connect(this.wallet.signer).addCollateral(token, amount)
  }

  async removeCollateral(contract, token: string, amount: BigNumber) {
    return await contract.connect(this.wallet.signer).removeCollateral(token, amount)
  }

  async borrow(contract, amount: BigNumber) {
    return await contract.connect(this.wallet.signer).take(amount)
  }

  async repay(contract, amount:BigNumber) {
    return await contract.connect(this.wallet.signer).put(amount)
  }

  async collateral(contract, account: string, token: string): Promise<any> {
    return await contract.accountCollateral(account, token)
  }

  async totalAssets(contract): Promise<BigNumber> {
    return await contract.totalAssets()
  }

  async collateralAmounts(contract) {
    return await contract.collateralAmounts()
  }

  async utilization(contract): Promise<BigNumber> {
    return await contract.utilization()
  }

  async depositApr(contract): Promise<BigNumber> {
    return await contract.depositApr();
  }

  async borrowApr(contract): Promise<BigNumber> {
    return await contract.borrowApr()
  }

  async rewardsApr(contract): Promise<BigNumber> {
    return await contract.rewardsApr()
  }

  async getVaultStats(contract) {
    return await contract.getVaultStats()
  }

  // ERC20
  async approve(contract, spender: string, amount: BigNumber) {
    await contract.connect(this.wallet.signer).approve(spender, amount)
  }

  async allowance(contract, account: string, spender: string): Promise<BigNumber> {
    return await contract.allowance(account, spender)
  }

  async balanceOf(contract, account: string): Promise<BigNumber> {
    return await contract.balanceOf(account)
  }

  async transfer(contract, to: string, amount: BigNumber) {
    await contract.connect(this.wallet.signer).transfer(to, amount)
  }

  async totalSupply(contract): Promise<BigNumber> {
    return await contract.totalSupply()
  }

  contractAt(address: string) {
    return new ethers.Contract(
      address,
      CheddaBaseTokenVault.abi,
      this.provider.provider
    )
  }
}
