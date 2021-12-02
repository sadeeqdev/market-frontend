import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';
import CheddaRewards from '../../artifacts/CheddaRewards.json'

export interface UserRewards {
  user: string
  points: number
  rank: number
}

@Injectable({
  providedIn: 'root'
})
export class CheddaRewardsService {

  private rewardsContract: any

  constructor(provider: DefaultProviderService, wallet: WalletProviderService) {
    this.rewardsContract = new ethers.Contract(
      wallet.currentConfig.contracts.CheddaRewards,
      CheddaRewards.abi,
      provider.provider
      );
  }

  async leaderboard() {
    let leaderboard = await this.rewardsContract.leaderboard()
    return leaderboard
  }
}
