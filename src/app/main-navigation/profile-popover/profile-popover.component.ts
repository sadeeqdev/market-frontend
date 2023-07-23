import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contract, ethers } from 'ethers';
import { EnvironmentProviderService } from 'src/app/providers/environment-provider.service';import { TokenService } from 'src/app/contracts/token.service';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { Subscription } from 'rxjs';
import { CheddaService } from 'src/app/contracts/chedda.service';
import { StakedCheddaService } from 'src/app/contracts/staked-chedda.service';
import { VeCheddaService } from 'src/app/contracts/ve-chedda.service';
@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class ProfilePopoverComponent implements OnInit, OnDestroy {
  @Input() address: string
  cheddaBalance: string
  stakedCheddaBalance: string
  isOpenProfileMenu: boolean;
  addressCopyText: string = 'Copy';
  cheddaContract: any;
  stakedCheddaContract: any;
  environment;
  netWorkChangeSubscription: Subscription;
  myCheddaBalance: string;
  myStakedCheddaBalance: string;
  veCheddaDepositSubscription: any;
  withdrawSubscription: Subscription;
  xCheddaDepositSubscription: Subscription;
  cheddaTransferSubscription: Subscription;

  constructor(
    private router: Router,
    private wallet: WalletProviderService,
    private chedda: CheddaService,
    private xChedda: StakedCheddaService,
    private veChedda: VeCheddaService,
    private tokenService: TokenService,
    private environmentService: EnvironmentProviderService
    ) { 
      this.environment = this.environmentService.environment;
    }

  async ngOnInit() {
    this.listenForEvents();
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
    if (this.wallet.isConnected && this.wallet.currentAccount) {
      this.cheddaBalance = ethers.utils.formatEther(await this.chedda.balanceOf(this.wallet.currentAccount))
      this.stakedCheddaBalance = ethers.utils.formatEther(await this.xChedda.balanceOf(this.wallet.currentAccount))
    }
  }

  private async listenForEvents() {
    this.cheddaTransferSubscription = this.chedda.transferSubject.subscribe(async res => {
      if (res && res.to.toLowerCase() === this.wallet.currentAccount.toLowerCase()) {
        this.checkBalance();
      }
    })

    this.xCheddaDepositSubscription = this.xChedda.depositSubject.subscribe(async res => {
      console.log('deposit received: ', res)
      if (this.wallet && this.wallet.currentAccount && res && res.from.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        this.checkBalance();
      }
    })

    this.veCheddaDepositSubscription = this.veChedda.depositSubject.subscribe(async res => {
      console.log('deposit received: ', res)
      if (this.wallet && this.wallet.currentAccount && res && res.address.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        this.checkBalance();
      }
    }) 

    this.withdrawSubscription = this.xChedda.withdrawSubject.subscribe(async res => {
      console.log('withdraw received: ', res)
      if (this.wallet && this.wallet.currentAccount && res && res.from.toLowerCase() == this.wallet.currentAccount.toLowerCase()) {
        this.checkBalance();
      }
    })
    
    this.netWorkChangeSubscription = this.environmentService.environmentSubject.subscribe(async network => {
      if(network){
        this.environment = network;
        this.cheddaContract = this.tokenService.contractAt(network.config.contracts.Chedda)
        this.stakedCheddaContract = this.tokenService.contractAt(network.config.contracts.xChedda)
        this.checkBalance();
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
