import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import CheddaLoanManager from '../../artifacts/CheddaLoanManager.json'
import ERC721 from '../../artifacts/ERC721.json'
import { Loan, LoanRequest } from '../lend/lend.models';
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';

export enum LoanStatus {
  all = 0,
  open = 1,
  repaid = 2,
  foreclosed = 3,
}

export enum LoanRequestStatus {
  all = 0,
  open = 1,
  cancelled = 2,
  accepted = 3,
}

@Injectable({
  providedIn: 'root'
})
export class CheddaLoanManagerService {

  loanManagerContract: any

  constructor(provider: DefaultProviderService, private wallet: WalletProviderService, private http: HttpClient) {
    this.loanManagerContract = new ethers.Contract(
      wallet.currentConfig.contracts.CheddaLoanManager,
      CheddaLoanManager.abi,
      provider.provider
      );
  }

  async requestLoan(nftAddress: string, tokenId: string, amount: string, duration: number) {
    await this.loanManagerContract.connect(this.wallet.signer).requestLoan(
      nftAddress,
      tokenId,
      amount,
      duration
    )
  }

  async cancelRequest(requestId) {
    await this.loanManagerContract.connect(this.wallet.signer).cancelRequest(requestId)
  }

  async getLoanRequests(address: string, status: LoanRequestStatus): Promise<LoanRequest[]> {
    const requests = await this.loanManagerContract.getLoanRequests(address, status)
    return requests
  }

  openLoan() {

  }

  repayLoan() {

  }

  forecloseLoan() {}

  async getLoanById(id: string): Promise<Loan> {
    return await this.loanManagerContract.loans(id)
  }

  async getLoanRequestById(id: string): Promise<LoanRequest> {
    return await this.loanManagerContract.requests(id)
  }

  async getOpenLoanRequest(nftContract: string, tokenID: string): Promise<LoanRequest> {
    const requestID =  await this.loanManagerContract.openRequests(nftContract, tokenID)
    console.log('requestID = ', requestID)
    if (requestID) {
      return await this.loanManagerContract.requests(requestID)
    }
  }
  
  getNFTContract(nftAddress: string) {
    return new ethers.Contract(nftAddress, ERC721.abi, this.wallet.signer)
  }

  contractAddress() {
    return this.loanManagerContract.address
  }
  
  async approve(nftAddress: string, tokenID: string) {
    const nft = new ethers.Contract(nftAddress, ERC721.abi, this.wallet.signer)
    await nft.approve(this.loanManagerContract.address, tokenID)
    return nft
  }


}
