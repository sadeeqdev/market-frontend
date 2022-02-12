import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { BehaviorSubject, Subject } from 'rxjs';
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

  myLoansSubject?: BehaviorSubject<Loan[]> = new BehaviorSubject(null)
  openLoanRequestsSubject?: BehaviorSubject<LoanRequest[]> = new BehaviorSubject(null)

  loanRequestCancelledEventSubject?: Subject<any> = new Subject()
  loanRequestedEventSubject?: Subject<any> = new Subject()
  loanOpenedEventSubject?: Subject<any> = new Subject()
  loanRepaidEventSubject?: Subject<any> = new Subject()
  loanForeclosedEventSubject?: Subject<any> = new Subject()

  loanRequestListSubject

  constructor(provider: DefaultProviderService, private wallet: WalletProviderService, private http: HttpClient) {
    this.loanManagerContract = new ethers.Contract(
      wallet.currentConfig.contracts.CheddaLoanManager,
      CheddaLoanManager.abi,
      provider.provider
      );
      this.registerEventListeners()
  }

  async requestLoan(nftAddress: string, tokenId: string, amount: string, duration: number) {
    return await this.loanManagerContract.connect(this.wallet.signer).requestLoan(
      nftAddress,
      tokenId,
      amount,
      duration
    )
  }

  async cancelRequest(requestId) {
    return await this.loanManagerContract.connect(this.wallet.signer).cancelRequest(requestId)
  }

  async getLoanRequests(address: string, status: LoanRequestStatus): Promise<LoanRequest[]> {
    return await this.loanManagerContract.getLoanRequests(address, status)
  }

  async openLoan(loanID: BigNumber, value: BigNumber) {
    return await this.loanManagerContract.connect(this.wallet.signer).openLoan(loanID, {value})
  }

  async repayLoan(loanID: BigNumber, value: BigNumber) {
    return await this.loanManagerContract.connect(this.wallet.signer).repay(loanID, {value})
  }

  async forecloseLoan(loanID: BigNumber) {
    return await this.loanManagerContract.foreclose(loanID)
  }

  async getLoanById(loanID: string): Promise<Loan> {
    return await this.loanManagerContract.loans(loanID)
  }

  async getLoanRequestById(requestID: string): Promise<LoanRequest> {
    return await this.loanManagerContract.requests(requestID)
  }

  async getLoansLentByAddress(address: string, state: LoanStatus): Promise<Loan[]> {
    return await this.loanManagerContract.getLoansLent(address, state)
  }

  async getLoansBorrowedByAddress(address: string, state: LoanStatus): Promise<Loan[]> {
    return await this.loanManagerContract.getLoansBorrowed(address, state)
  }

  async calculateRepaymentAmount(amount: string, duration: number) {
    const repayment = await this.loanManagerContract.calculateRepaymentAmount(amount, duration)
    return repayment
  }

  async getOpenLoanRequest(nftContract: string, tokenID: string): Promise<LoanRequest> {
    const requestID =  await this.loanManagerContract.openRequests(nftContract, tokenID)
    console.log('requestID = ', requestID)
    if (requestID && !requestID.isZero()) {
      return await this.loanManagerContract.requests(requestID)
    } else {
      return null
    }
  }

  async getOpenLoan(nftContract: string, tokenID: string): Promise<Loan> {
    const loanID = await this.loanManagerContract.openLoans(nftContract, tokenID)
    if (loanID && !loanID.isZero()) {
      console.log('loanID =', loanID)
      return await this.loanManagerContract.loans(loanID)
    } else {
      return null
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

  async refreshLoanRequests() {
    console.log('refreshing loan requests')
    const requests = await this.getLoanRequests(ethers.constants.AddressZero, LoanRequestStatus.open)
    console.log('next list of requests = ', requests)
    this.openLoanRequestsSubject.next(requests)
  }

  async refreshMyLoans() {
    if (!this.wallet.currentAccount) {
      return
    }
    const myLoans = await this.getLoansLentByAddress(this.wallet.currentAccount, LoanStatus.open)
    this.myLoansSubject.next(myLoans)
  }

  async registerEventListeners() {
    await this.refreshLoanRequests()
    await this.refreshMyLoans()
    this.loanManagerContract.on('RequestCancelled', async (address, requestId) => {
      console.log('RequestCancelled: ', address, requestId)
      this.loanRequestCancelledEventSubject?.next({
        address,
        requestId
      })
    })

    this.loanManagerContract.on('LoanRequested', async (requestedBy, contractAddress, tokenID, amount) => {
      console.log(`got loan request: {${requestedBy}, ${contractAddress} ${tokenID}, ${amount}}`)
      this.loanRequestedEventSubject?.next({
        requestedBy, contractAddress, tokenID, amount
      })
      this.refreshLoanRequests()
    })

    this.loanManagerContract.on('LoanOpened', async (lender, borrower, requestID, amount) => {
      this.loanOpenedEventSubject?.next({
        lender,
        borrower,
        requestID,
        amount
      })
      this.refreshLoanRequests()
    })

    this.loanManagerContract.on('LoanRepaid', async (loanID, borrower, lender, amount) => {
      this.loanRepaidEventSubject?.next({
        loanID,
        borrower,
        lender,
        amount
      })
    })

    this.loanManagerContract.on('LoanForeclosed', async(loanId, borrower, lender) => {
      this.loanForeclosedEventSubject?.next({
        loanId,
        borrower,
        lender
      })
    })
  }
}
