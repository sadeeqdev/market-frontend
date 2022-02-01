import { BigNumber } from "ethers"

export interface LoanRequest {
    requestID: BigNumber
    nftContract: string
    tokenID: BigNumber
    amount: BigNumber
    loanLength: BigNumber
    borrower: string
    state: number
}

export interface Loan {
    loanID: BigNumber
    nftContract: string
    tokenID: BigNumber
    principal: BigNumber
    repaymentAMount: BigNumber
    openedAt: BigNumber
    expiresAt: BigNumber
    closedAt: BigNumber
    interestRate: BigNumber
    state: number
    lender: string
    borrower: string
}