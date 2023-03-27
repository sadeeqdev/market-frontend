import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ethers } from 'ethers';
import { TokenService } from 'src/app/contracts/token.service';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { environment } from 'src/environments/environment';
import { Profile } from '../../profile.interface';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})

export class ProfilePopoverComponent implements OnInit {

  address: string
  profile: Profile
  balance = 0
  cheddaContract
  stakedCheddaContract
  cheddaBalance
  xCheddaBalance

  constructor(
    private router: Router,
    private wallet: WalletProviderService,
    private tokenService: TokenService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.cheddaContract = this.tokenService.contractAt(environment.config.contracts.Chedda)
    this.stakedCheddaContract = this.tokenService.contractAt(environment.config.contracts.xChedda)
    this.listenForTransfers()
    this.checkBalance()
  }

  private async checkBalance() {
    if (this.address) {
      await this.checkCheddaBalance()
      await this.checkStakedCheddaBalance()
    }
  }

  private async checkCheddaBalance() {
    const cheddaBalance = await this.tokenService.balanceOf(this.cheddaContract, this.address) 
    this.cheddaBalance = ethers.utils.formatEther(cheddaBalance)
  }

  private async checkStakedCheddaBalance() {
    const sChedaBalance = await this.tokenService.balanceOf(this.stakedCheddaContract, this.address) 
    this.xCheddaBalance = ethers.utils.formatEther(sChedaBalance)
  }

  async navigateToProfile() {
    this.popoverController.dismiss()
    this.router.navigate(['/', 'profile', this.address])
  }

  async disconnect() {
    await this.wallet.disconnect()
  }

  private async listenForTransfers() {
    this.cheddaContract.on('Transfer', (from, to, value) => {
      if (from.toLowerCase() == this.address.toLocaleLowerCase() || to.toLowerCase() == this.address.toLocaleLowerCase()) {
        this.checkCheddaBalance()
      }
    })

    this.stakedCheddaContract.on('Transfer', (from, to, value) => {
      if (from.toLowerCase() == this.address.toLocaleLowerCase() || to.toLowerCase() == this.address.toLocaleLowerCase()) {
        this.checkStakedCheddaBalance()
      }
    })
  }
}
