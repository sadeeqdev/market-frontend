import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ethers } from 'ethers';
import { CheddaLoanManagerService } from 'src/app/contracts/chedda-loan-manager.service';
import { NFT } from 'src/app/nfts/models/nft.model';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';

@Component({
  selector: 'app-get-loan-modal',
  templateUrl: './get-loan-modal.component.html',
  styleUrls: ['./get-loan-modal.component.scss'],
})
export class GetLoanModalComponent implements OnInit {
  nft: NFT
  SECONDS_IN_DAY = 86400
  loanForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required, Validators.minLength(3)]),
    repayment: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })
  approved = true
  termOptions = [
    7,
    14,
    30,
    365
  ]
  constructor(
    private modalController: ModalController,
    private loanManger: CheddaLoanManagerService,
    private globalAlert: GlobalAlertService,
    ) { }

  ngOnInit() {}

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
    } catch(err) {
      console.log('error: ', err)
    }
    this.modalController.dismiss()
  }

  async onApproveClicked() {
    await this.loanManger.approve(this.nft.nftContract, this.nft.tokenID)
    this.modalController.dismiss()
  }

  onCollectionItemSelected() {}

  private validateInput() {
    return true
  }
}
