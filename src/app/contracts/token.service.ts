import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';
import ERC20 from '../../artifacts/ERC20.json'
import ERC721 from '../../artifacts/ERC721.json'
import MarketNFT from '../../artifacts/MarketNFT.json'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private provider: DefaultProviderService, private wallet: WalletProviderService, private http: HttpClient) {

  }

  async name(contract): Promise<string> {
    return await contract.name()
  }

  async symbol(contract): Promise<string> {
    return await contract.symbol()
  }
  
  async approve(contract, spender: string, amount: BigNumber) {
    if (contract.isNFT) {
      await contract.connect(this.wallet.signer).setApprovalForAll(spender, amount)
    } else {
      await contract.connect(this.wallet.signer).approve(spender, amount)
    }
  }

  async allowance(contract, account: string, spender: string): Promise<BigNumber> {
    if (contract.isNFT) {
      return await contract.isApprovedForAll(account, spender)
    } else {
      return await contract.allowance(account, spender)
    }
  }

  async balanceOf(contract, account: string): Promise<BigNumber> {
    return await contract.balanceOf(account)
  }

  async ownedTokens(contract, account: string): Promise<string[]> {
    return (await contract.ownedTokens(account)).map(t => t.toString())
  }

  async transfer(contract, to: string, amount: BigNumber) {
    await contract.connect(this.wallet.signer).transfer(to, amount) 
  }

  async totalSupply(contract): Promise<BigNumber> {
    return await contract.totalSupply()
  }

  contractAt(address: string, isNFT: boolean = false) {
    let abi;
    if (isNFT) {
      abi = MarketNFT.abi
    } else {
      abi = ERC20.abi
    }
    return new ethers.Contract(
      address,
      abi,
      this.provider.provider
      ) 
  }
}
