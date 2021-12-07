import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';
import CheddaRewards from '../../artifacts/CheddaRewards.json'
import { Subscription } from 'rxjs';
import { GlobalAlertService } from '../shared/global-alert.service';

export interface UserRewards {
  user: string
  points: number
  rank: number
}

@Injectable({
  providedIn: 'root'
})
export class CheddaRewardsService implements OnDestroy {

  private rewardsContract: any
  private acount
  private accountSubscription?: Subscription

  constructor(
    provider: DefaultProviderService, 
    private wallet: WalletProviderService,
    private alert: GlobalAlertService) {
    this.rewardsContract = new ethers.Contract(
      wallet.currentConfig.contracts.CheddaRewards,
      CheddaRewards.abi,
      provider.provider
      );
    this.registerEventListener()
  }

  ngOnDestroy(): void {
      this.accountSubscription?.unsubscribe()
  }

  async leaderboard() {
    let leaderboard = await this.rewardsContract.leaderboard()
    return leaderboard
  }

  async registerEventListener() {
    console.log('**** registereing event listener')
    this.accountSubscription = this.wallet.accountSubject.subscribe(newAccount => {
      this.acount = newAccount
      console.log('listening for events on account: ', this.acount)
    })
    this.rewardsContract.on('RewardsIssued', (actionType, amount, address) => {
      console.log('**** rewards action fired: ', actionType, amount, address)
      console.log(`${address} <==> ${this.acount}`)
      if (address.toLowerCase() == this.acount.toLowerCase()) {
        this.alert.showRewardReceivedToast(amount)
      }
    })

  }
}
