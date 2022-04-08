import { BigNumber } from "ethers"
import { NFT } from "../nfts/models/nft.model"

export enum LoanState {
    all = 0,
    open,
    repayed,
    foreclosed
}

export enum LoanRequestState {
    all = 0,
    open,
    cancelled,
    accepted
}

export interface LoanRequest {
    requestID: BigNumber
    nftContract: string
    tokenID: BigNumber
    amount: BigNumber
    repayment: BigNumber
    loanLength: BigNumber
    borrower: string
    state: LoanRequestState
    nft?: NFT
}

export interface Loan {
    loanID: BigNumber
    nftContract: string
    tokenID: BigNumber
    principal: BigNumber
    repaymentAmount: BigNumber
    openedAt: BigNumber
    expiresAt: BigNumber
    closedAt: BigNumber
    interestRate: BigNumber
    state: LoanState
    lender: string
    borrower: string,
    nft?: NFT
}

export interface LendingPool {
    name: string
    address: string
    asset: any
    collateral: any[]
    stats?: any
    votes?: BigNumber
}
