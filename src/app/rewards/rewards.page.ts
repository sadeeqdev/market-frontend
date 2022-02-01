import { ApplicationRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CheddaRewardsService } from '../contracts/chedda-rewards.service';
import { ThemingService } from '../shared/theming.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit, OnDestroy {

  theme = 'light-theme'
  private themeSubscription?: Subscription

  columns = [
    {
      name: 'Address',
      prop: 'user',
      flexGrow: 3,
    },
    {
      name: 'Points',
      prop: 'points',
      flexGrow: 1,
    },
    {
      name: 'NFT Prize',
      prop: 'rank',
      flexGrow: 1,
    }
  ]

  prizes = [
    {
      name: 'Chedda Boss NFT',
      quantity: 1,
      image: '/assets/images/badges/png/Boss.png'
    },
    {
      name: 'Chedda Underboss NFT',
      quantity: 3,
      image: '/assets/images/badges/png/Underboss.png'
    },
    {
      name: 'Chedda Consigliere NFT',
      quantity: 5,
      image: '/assets/images/badges/png/Consigliere.png'
    }, 
    {
      name: 'Chedda Capo NFT',
      quantity: 10,
      image: '/assets/images/badges/png/Capo.png'
    },
    {
      name: 'Chedda Soldier NFT',
      quantity: 20,
      image: '/assets/images/badges/png/Soldier.png'
    },
    {
      name: 'Chedda Associate NFT',
      quantity: 100,
      image: '/assets/images/badges/png/Associate.png'
    },
  ]

  leaderboard: any[]
  constructor(
    private rewardsService: CheddaRewardsService, private theming: ThemingService) { }

  async ngOnInit() {
    this.registerThemeListener()
    await this.loadLeaderboard()
  }

  ngOnDestroy(): void {
      this.themeSubscription?.unsubscribe()
  }

  async loadLeaderboard() {
    this.leaderboard = await this.rewardsService.leaderboard()
    console.log('leaderboard is ', this.leaderboard)
  }

  private registerThemeListener() {
    this.themeSubscription = this.theming.theme.subscribe(theme => {
      console.log('*** theme is now ', theme)
      this.theme = theme
    })
  }

  themeChanged(theme) {
    console.log('theme changed to ', theme)
  }

}
