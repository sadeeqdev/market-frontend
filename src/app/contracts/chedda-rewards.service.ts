import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
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
export class CheddaRewardsService implements OnInit, OnDestroy {

  private rewardsContract: any
  private account
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

  ngOnInit(): void {
      
  }
  ngOnDestroy(): void {
      this.accountSubscription?.unsubscribe()
  }

  async leaderboard() {
    let leaderboard = await this.rewardsContract.leaderboard()
    return leaderboard
  }

  async registerEventListener() {
    this.accountSubscription = this.wallet.accountSubject.subscribe(newAccount => {
      this.account = newAccount
    })
    this.rewardsContract.on('RewardsIssued', (actionType, amount, address) => {
      if (address && this.account && address.toLowerCase() == this.account.toLowerCase()) {
        this.alert.showRewardReceivedToast(amount)
      }
    })

  }
}
