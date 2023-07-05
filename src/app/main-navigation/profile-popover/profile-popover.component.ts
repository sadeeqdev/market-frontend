import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ethers } from 'ethers';
import { EnvironmentProviderService } from 'src/app/providers/environment-provider.service';import { TokenService } from 'src/app/contracts/token.service';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class ProfilePopoverComponent implements OnInit, OnDestroy {
  @Input() address: string
  cheddaBalance: string
  xCheddaBalance: string
  isOpenProfileMenu: boolean;
  addressCopyText: string = 'Copy';
  cheddaContract: any;
  stakedCheddaContract: any;
  environment;
  netWorkChangeSubscription: Subscription;

  constructor(
    private router: Router,
    private wallet: WalletProviderService,
    private tokenService: TokenService,
    private environmentService: EnvironmentProviderService
    ) { 
      this.environment = this.environmentService.environment;
    }

  async ngOnInit() {
    this.cheddaContract = this.tokenService.contractAt(this.environment.config.contracts.Chedda)
    this.stakedCheddaContract = this.tokenService.contractAt(this.environment.config.contracts.xChedda)
    this.listenForTransfers();
    this.listenForEvents();
    this.checkBalance();
  }

  async ngOnDestroy() {
    this.netWorkChangeSubscription?.unsubscribe;
  }

  copyAddress() {
    navigator.clipboard.writeText(this.address).then(() => {
      this.addressCopyText = 'Copied!';
      setTimeout(() => {
        this.addressCopyText = 'Copy';
      }, 2000)
    }).catch(e => console.log(e));
  }

  async navigateToProfile() {
    this.router.navigate(['/', 'profile', this.address])
  }

  async disconnect() {
    await this.wallet.disconnect()
  }

  openProfileMenu(){
    this.isOpenProfileMenu = !this.isOpenProfileMenu
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

  private async listenForEvents() {
    this.netWorkChangeSubscription = this.environmentService.environmentSubject.subscribe(async network => {
      if(network){
        this.environment = network;
        this.cheddaContract = this.tokenService.contractAt(network.config.contracts.Chedda)
        this.stakedCheddaContract = this.tokenService.contractAt(network.config.contracts.xChedda)
        this.checkBalance();
      }
    })
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.profile-menu-container')) {
      this.isOpenProfileMenu = false;
    }
  } 
}
