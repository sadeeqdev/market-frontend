import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { ethers } from 'ethers';
import { duration } from 'moment';
import { CheddaLoanManagerService } from 'src/app/contracts/chedda-loan-manager.service';
import { NFT } from 'src/app/nfts/models/nft.model';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-get-loan-modal',
  templateUrl: './get-loan-modal.component.html',
  styleUrls: ['./get-loan-modal.component.scss'],
})
export class GetLoanModalComponent implements OnInit {
  nft: NFT
  nftContract
  loader
  currency = ''
  SECONDS_IN_DAY = 86400
  repaymenAmount = ''
  loanForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required,]),
    repayment: new FormControl('', ),
  })
  approved = false
  termOptions = [
    7,
    14,
    30,
    365
  ]
  constructor(
    private modalController: ModalController,
    private loanManger: CheddaLoanManagerService,
    private wallet: WalletProviderService,
    private loadingController: LoadingController,
    private globalAlert: GlobalAlertService,
    ) { }

  ngOnInit() {
    console.log('got nft: ', this.nft)
    this.currency = environment.config.networkParams.nativeCurrency.symbol
  }

  async onSubmitClicked() {
    let loanAmount = this.loanForm.get('amount').value
    loanAmount= ethers.utils.parseEther(loanAmount.toString())
    let term: number = this.loanForm.get('duration').value
    term = term * this.SECONDS_IN_DAY

    if (!this.validateInput()) {
      // show error
      return
    }
    console.log(`requestiong a loan for: ${loanAmount} <> ${term}`)
    try {
      await this.loanManger.requestLoan(this.nft.nftContract, this.nft.tokenID, loanAmount, term)
      this.modalController.dismiss({loanRequested: true})
    } catch(err) {
      console.log('error: ', err)
      this.globalAlert.showErrorAlert(err)
    }
  }

  async onApproveClicked() {
    try {
      this.nftContract = this.loanManger.getNFTContract(this.nft.nftContract)
      this.showLoading()
      this.listenForApproval()
      await this.loanManger.approve(this.nft.nftContract, this.nft.tokenID)
    } catch (error) {
      console.error('error approving: ', error)
      await this.hideLoading()
      await this.globalAlert.showErrorAlert(error)
    }
  }

  private async listenForApproval() {
    this.nftContract.on('Approval', async (userAddress, to, tokenID) => {
      console.log(`matching address: ${userAddress} == ${this.wallet.currentAccount}`)
      console.log(`matching to: ${to} == ${this.loanManger.contractAddress()}`)
      console.log(`matching tokenID: ${tokenID} == ${this.nft.tokenID}`)
      if (userAddress.toLowerCase() == this.wallet.currentAccount.toLowerCase() && 
      tokenID == this.nft.tokenID && 
      to.toLowerCase() == this.loanManger.contractAddress().toLowerCase()) {
        this.approved = true
        await this.hideLoading()
      }
    })
  }

  private async showLoading() {
    this.loader = await this.loadingController.create({
      message: 'Waiting for approval'
    })
    this.listenForApproval()
    await this.loader.present()
  }

  private async hideLoading() {
    console.log('hiding loader')
    this.loader.dismiss()
  }

  async onLoanTermChanged() {
    await this.onAmountChanged()
  }

  async onAmountChanged() {
    console.log('changed')
    try {
      let loanAmount = this.loanForm.get('amount').value
      console.log('loanAmount = ', loanAmount)
      loanAmount= ethers.utils.parseEther(loanAmount.toString())
      let term: number = this.loanForm.get('duration').value   
      term = term * this.SECONDS_IN_DAY
      
      console.log(`loanAmount = ${loanAmount}, term = ${term}`)
      if (!loanAmount || !term) {
        return
      }
      const repaymenAmount = (await this.loanManger.calculateRepaymentAmount(loanAmount, term)).toString()
      console.log('repaymentAmount = ', repaymenAmount)
      this.repaymenAmount = ethers.utils.formatEther(repaymenAmount)
    } catch (error) {
      console.error('cauth error: ', error)
      this.globalAlert.showErrorAlert(error)
    }

  }

  private validateInput() {
    return true
  }
}
